import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UserMediaRepository } from 'src/common/database/userMedia/repositories/user-media.repository';
import { CreateUserMediaModel } from '../models/create-user-media-model';
import { UpdateUserMediaModel } from '../models/update-user-media-model';
import { UserMediaReadModel } from '../models/read-user-media-model';


@Injectable()
export class UserMediaService {
    constructor(
        private readonly userMediaRepository: UserMediaRepository,
    ) { }

    /** ✅ Create Media */
    async createMedia(model: CreateUserMediaModel): Promise<{ id: string }> {
        try {
            const media = await this.userMediaRepository.create(model);
            return { id: media.id };
        } catch (error) {
            console.error('Error creating media:', error);
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to create media', {
                cause: new Error(`Error creating media: ${error?.message}`),
            });
        }
    }

    public async createMany(
        memorialId: string,
        mediaList: CreateUserMediaModel[],
    ): Promise<{ ids: string[] }> {
        try {
            if (!mediaList || mediaList.length === 0) {
                return { ids: [] };
            }

            const recordsToCreate = mediaList.map((media) => ({
                ...media,
                memorialId,
            }));

            const result = await this.userMediaRepository.createMany(recordsToCreate);
            return { ids: result.map((item) => item.id) };
        } catch (error) {
            console.error('Error in UserMediaService.createMany:', error);
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create user media', {
                cause: new Error(`Bulk media creation failed: ${error?.message}`),
            });
        }
    }

    public async updateMany(
        memorialId: string,
        mediaList: UpdateUserMediaModel[],
    ): Promise<{ ids: string[] }> {
        try {
            const records = mediaList.map((media) => ({
                ...media,
                memorialId,
            }));

            const result = await this.userMediaRepository.updateMany(records);
            return { ids: result.map((item) => item.id) };
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user media', {
                cause: new Error(`Bulk update media failed: ${error?.message}`),
            });
        }
    }








    /** ✅ Update Media */
    async updateMedia(model: UpdateUserMediaModel): Promise<{ id: string }> {
        try {
            const existing = await this.userMediaRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Media not found');
            }

            return await this.userMediaRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update media', {
                cause: new Error(`Updating media failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Media by ID */
    async getMediaById(id: string): Promise<UserMediaReadModel> {
        try {
            const media = await this.userMediaRepository.getById(id);
            if (!media) throw new NotFoundException('Media not found');
            return media;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get media', {
                cause: new Error(`Getting media failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Media */
    async getAllMedia(): Promise<UserMediaReadModel[]> {
        try {
            return await this.userMediaRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch media list', {
                cause: new Error(`Fetching media failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Media by MemorialId */
    async getMediaByMemorialId(memorialId: string): Promise<UserMediaReadModel[]> {
        try {
            return await this.userMediaRepository.getByMemorialId(memorialId);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch media by memorial ID', {
                cause: new Error(`Fetching media by memorial ID failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Media by UserId */
    async getMediaByUserId(userId: string): Promise<UserMediaReadModel[]> {
        try {
            return await this.userMediaRepository.getByUserId(userId);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch media by user ID', {
                cause: new Error(`Fetching media by user ID failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Media */
    async deleteMedia(id: string): Promise<{ id: string }> {
        try {
            return await this.userMediaRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete media', {
                cause: new Error(`Deleting media failed: ${error?.message}`),
            });
        }
    }
}

