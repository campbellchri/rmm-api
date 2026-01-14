import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UserFeaturedMemorialRepository } from 'src/common/database/userFeaturedMemorials/repositories/user-featured-memorial.repository';
import { FeatureMemorialModel } from '../models/feature-memorial-model';
import { UserFeaturedMemorialReadModel } from '../models/read-user-featured-memorial-model';

@Injectable()
export class UserFeaturedMemorialService {
    constructor(
        private readonly userFeaturedMemorialRepository: UserFeaturedMemorialRepository,
    ) {}

    /** ✅ Feature Memorial */
    async featureMemorial(model: FeatureMemorialModel): Promise<{ id: string; userId: string; memorialId: string; isFeature: boolean }> {
        try {
            const featured = await this.userFeaturedMemorialRepository.featureMemorial(model);
            return {
                id: featured.id,
                userId: featured.userId,
                memorialId: featured.memorialId,
                isFeature: featured.isFeature,
            };
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to feature memorial', {
                cause: new Error(`Error featuring memorial: ${error?.message}`),
            });
        }
    }

    /** ✅ Unfeature Memorial */
    async unfeatureMemorial(userId: string, memorialId: string): Promise<{ id: string }> {
        try {
            return await this.userFeaturedMemorialRepository.unfeatureMemorial(userId, memorialId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to unfeature memorial', {
                cause: new Error(`Error unfeaturing memorial: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Featured Memorials by User */
    async getFeaturedMemorialsByUser(userId: string): Promise<UserFeaturedMemorialReadModel[]> {
        try {
            return await this.userFeaturedMemorialRepository.getFeaturedMemorialsByUser(userId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get featured memorials', {
                cause: new Error(`Error getting featured memorials: ${error?.message}`),
            });
        }
    }

    /** ✅ Check if Memorial is Featured by User */
    async isFeaturedByUser(userId: string, memorialId: string): Promise<boolean> {
        try {
            return await this.userFeaturedMemorialRepository.isFeaturedByUser(userId, memorialId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to check if memorial is featured', {
                cause: new Error(`Error checking featured status: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Featured Memorial by ID */
    async getById(id: string): Promise<UserFeaturedMemorialReadModel> {
        try {
            return await this.userFeaturedMemorialRepository.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get featured memorial', {
                cause: new Error(`Error getting featured memorial: ${error?.message}`),
            });
        }
    }
}
