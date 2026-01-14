import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { LandingModeRepository } from 'src/common/database/landingMode/repositories/landing-mode.repository';
import { CreateLandingModeModel } from '../models/create-landing-mode.model';
import { LandingModeReadModel } from '../models/read-landing-mode.model';
import { UpdateLandingModeModel } from '../models/update-landing-mode.model';


@Injectable()
export class LandingModeService {
    constructor(
        private readonly landingModeRepository: LandingModeRepository,
    ) { }

    async createLandingMode(model: CreateLandingModeModel): Promise<{ id: string }> {
        try {
            const landingMode = await this.landingModeRepository.create(model);
            return LandingModeReadModel.fromEntity(landingMode);
        } catch (error) {
            console.error('Error creating landing mode:', error);
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to create landing mode', {
                cause: new Error(`Error creating landing mode: ${error?.message}`),
            });
        }
    }

    async updateLandingMode(model: UpdateLandingModeModel): Promise<{ id: string }> {
        try {
            const existing = await this.landingModeRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Landing mode not found');
            }

            const updatedLandingMode = await this.landingModeRepository.update(model);
            return updatedLandingMode
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update landing mode', {
                cause: new Error(`Updating landing mode failed: ${error?.message}`),
            });
        }
    }

    async getLandingModeById(id: string): Promise<LandingModeReadModel> {
        try {
            const landingMode = await this.landingModeRepository.getById(id);
            if (!landingMode) throw new NotFoundException('Landing mode not found');
            return landingMode
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get landing mode', {
                cause: new Error(`Getting landing mode failed: ${error?.message}`),
            });
        }
    }

    async getAllLandingModes(
    ): Promise<LandingModeReadModel[]> {
        try {
            return await this.landingModeRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch landing modes', {
                cause: new Error(`Fetching landing modes failed: ${error?.message}`),
            });
        }
    }

    async deleteLandingMode(id: string): Promise<{ id: string }> {
        try {
            return await this.landingModeRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete landing mode', {
                cause: new Error(`Deleting landing mode failed: ${error?.message}`),
            });
        }
    }
}
