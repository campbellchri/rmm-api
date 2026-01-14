import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { MemorialRepository } from 'src/common/database/memorials/repositories/memorial.repository';
import { CreateMemorialModel } from '../models/create-memorial-model';
import { UpdateMemorialModel } from '../models/update-memorial-model';
import { MemorialReadModel } from '../models/read-memorial-model';
import { UserMediaService } from 'src/userMedia/services/user-media.service';
import { UserTributeService } from 'src/userTributes/services/user-tributes.service';
import { MemorialSayingsService } from 'src/memorialSayings/services/memorial-sayings.service';
import { LandingModeService } from 'src/landingMode/services/landing-mode.service';
import { MemorialQRCodeService } from 'src/memorialQRCodes/services/memorial-qr-code.service';
import { LANDING_MODES_TYPES } from 'src/landingMode/enums/landing-mode.enum';
import { CreateMemorialQRCodeModel } from 'src/memorialQRCodes/models/create-memorial-qr-code-model';

@Injectable()
export class MemorialService {
    constructor(
        private readonly memorialRepository: MemorialRepository,
        private readonly userMediaService: UserMediaService,
        private readonly userTributeService: UserTributeService,
        private readonly memorialSayingsService: MemorialSayingsService,
        private readonly landingModeService: LandingModeService,
        private readonly memorialQRCodeService: MemorialQRCodeService,
    ) { }

    /** ✅ Create Memorial */
    /**
     * Creates a memorial supporting three types:
     * 1. Full Memorial Mode - Complete memorial with life story, photos, videos, sayings, tributes
     * 2. Video Only Mode - Focused on videos for funerals/memorial events
     * 3. Event Mode - Temporary memorial for special dates (anniversaries, birthdays) with auto-revert
     */
    public async createMemorial(
        model: CreateMemorialModel,
    ): Promise<{ id: string }> {
        try {
            // Validate landing mode and get its type for validation
            // The repository already validates landing mode exists, but we need the type for validation
            let landingModeType: string | undefined;
            try {
                const landingMode = await this.landingModeService.getLandingModeById(model.landingModeId);
                landingModeType = landingMode.landingModeType;
            } catch (error) {
                // If landing mode not found, repository will handle it
                // We'll skip mode-specific validation if we can't get the type
            }

        
            if (landingModeType) {
                this.validateMemorialByMode(model, landingModeType);
            }

            // 1. Create Memorial
            const memorial = await this.memorialRepository.create(model);

            // 2. Create User Media if provided
            if (model.userMedia?.length) {
                await this.userMediaService.createMany(memorial.id, model.userMedia);
            }

            // 3. Create User Tributes if provided
            if (model.userTributes?.length) {
                await this.userTributeService.createMany(memorial.id, model.userTributes);
            }

            // 4. Create Favorite Sayings if provided
            if (model.favoriteSayings?.length) {
                await this.memorialSayingsService.createMany(memorial.id, model.favoriteSayings);
            }

            // 5. Create QR Code if qrCodeData is provided
            if (model.pageURL) {
                const qrCodeModel = CreateMemorialQRCodeModel.fromDto({
                    memorialId: memorial.id,
                    qrCodeData: model.pageURL,
                });
                await this.memorialQRCodeService.createQRCode(qrCodeModel);
            }

            return { id: memorial.id };
        } catch (error) {
            console.error('Error creating memorial:', error);
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create memorial', {
                cause: new Error(`Error creating memorial: ${error?.message}`),
            });
        }
    }

    /**
     * Validates memorial data based on landing mode type
     * Ensures required fields are present for each memorial type
     */
    private validateMemorialByMode(
        model: CreateMemorialModel,
        landingModeType: string,
    ): void {
        switch (landingModeType) {
            case LANDING_MODES_TYPES.FULL_MODE:
                // Full Memorial Mode: All fields are optional, but personName is recommended
                // No strict validation needed as it's the most flexible mode
                break;

            case LANDING_MODES_TYPES.VIDEO_ONLY_MODE:
                // Video Only Mode: Should have at least one video
                if (!model.userMedia || model.userMedia.length === 0) {
                    throw new BadRequestException(
                        'Video Only Mode requires at least one video in userMedia'
                    );
                }
                const hasVideo = model.userMedia.some(
                    media => media.type === 'video'
                );
                if (!hasVideo) {
                    throw new BadRequestException(
                        'Video Only Mode requires at least one video in userMedia'
                    );
                }
                break;

            case LANDING_MODES_TYPES.EVENT_MODE:
                // Event Mode: Requires eventStart and eventDuration
                if (!model.eventStart) {
                    throw new BadRequestException(
                        'Event Mode requires eventStart date and time'
                    );
                }
                if (!model.eventDuration) {
                    throw new BadRequestException(
                        'Event Mode requires eventDuration (e.g., "48h", "24h")'
                    );
                }
                // Event mode typically has autoRevertToFullMode enabled
                if (model.autoRevertToFullMode === undefined) {
                    model.autoRevertToFullMode = true;
                }
                break;

            default:
                // Unknown mode - allow it but log a warning
                console.warn(`Unknown landing mode type: ${landingModeType}`);
                break;
        }
    }

    public async updateMemorials(
        model: UpdateMemorialModel,
    ): Promise<{ id: string }> {
        try {
            // 1. Update memorial main data
            await this.memorialRepository.update({
                id: model.id,
                favSaying: model.favSaying,
                landingModeId: model.landingModeId,
                templateId: model.templateId,
                personName: model.personName,
                personBirthDate: model.personBirthDate,
                personDeathDate: model.personDeathDate,
                personProfilePicture: model.personProfilePicture,
                profilePictureId: model.profilePictureId,
                favQuote: model.favQuote,
                eventStart: model.eventStart,
                eventDuration: model.eventDuration,
                autoRevertToFullMode: model.autoRevertToFullMode,
            });

            if (model.userMedia?.length) {
                await this.userMediaService.updateMany(model.id, model.userMedia);
            }

            if (model.userTributes?.length) {
                await this.userTributeService.updateMany(model.id, model.userTributes);
            }

            return { id: model.id };
        } catch (error) {
            throw new InternalServerErrorException('Failed to update memorial', {
                cause: new Error(`Error updating memorial: ${error?.message}`),
            });
        }
    }



    /** ✅ Update Memorial */
    async updateMemorial(model: UpdateMemorialModel): Promise<{ id: string }> {
        try {
            const existing = await this.memorialRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Memorial not found');
            }

            return await this.memorialRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update memorial', {
                cause: new Error(`Updating memorial failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Memorial by ID */
    async getMemorialById(id: string): Promise<MemorialReadModel> {
        try {
            const memorial = await this.memorialRepository.getById(id);
            if (!memorial) throw new NotFoundException('Memorial not found');
            return memorial;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get memorial', {
                cause: new Error(`Getting memorial failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Memorials */
    async getAllMemorials(): Promise<MemorialReadModel[]> {
        try {
            return await this.memorialRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch memorials', {
                cause: new Error(`Fetching memorials failed: ${error?.message}`),
            });
        }
    }

    async getMemorialsByCreatorIdAndMode(
        creatorId: string,
        memorialId: string,
        mode?: 'video-mode' | 'full-mode' | 'event-mode',
    ): Promise<MemorialReadModel[]> {
        try {
            const memorials = await this.memorialRepository.getByCreatorId(
                creatorId,
                memorialId,
            );

            if (!mode) return memorials; // return all if no mode filter

            return memorials.filter((m) => {
                switch (mode) {
                    case 'video-mode':
                        return (
                            m.landingMode?.landingModeType ===
                            LANDING_MODES_TYPES.VIDEO_ONLY_MODE
                        );
                    case 'full-mode':
                        return (
                            m.landingMode?.landingModeType === LANDING_MODES_TYPES.FULL_MODE
                        );
                    case 'event-mode':
                        return (
                            m.landingMode?.landingModeType === LANDING_MODES_TYPES.EVENT_MODE
                        );
                    default:
                        return false;
                }
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException('Failed to get memorials', {
                cause: new Error(`Getting memorials failed: ${error?.message}`),
            });
        }
    }



    /** ✅ Delete Memorial */
    async deleteMemorial(id: string): Promise<{ id: string }> {
        try {
            return await this.memorialRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete memorial', {
                cause: new Error(`Deleting memorial failed: ${error?.message}`),
            });
        }
    }
}
