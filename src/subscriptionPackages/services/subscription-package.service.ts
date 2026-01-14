import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { SubscriptionPackageRepository } from 'src/common/database/subscriptionPackages/repositories/subscription-package.repository';
import { CreateSubscriptionPackageModel } from '../models/create-subscription-package-model';
import { UpdateSubscriptionPackageModel } from '../models/update-subscription-package-model';
import { SubscriptionPackageReadModel } from '../models/read-subscription-package-model';

@Injectable()
export class SubscriptionPackageService {
    constructor(
        private readonly subscriptionPackageRepository: SubscriptionPackageRepository,
    ) {}

    /** ✅ Create Subscription Package */
    async createSubscriptionPackage(model: CreateSubscriptionPackageModel): Promise<{ id: string }> {
        try {
            const packageEntity = await this.subscriptionPackageRepository.create(model);
            return { id: packageEntity.id };
        } catch (error) {
            throw new InternalServerErrorException('Failed to create subscription package', {
                cause: new Error(`Error creating subscription package: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Subscription Package by ID */
    async getSubscriptionPackageById(id: string): Promise<SubscriptionPackageReadModel> {
        try {
            return await this.subscriptionPackageRepository.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get subscription package', {
                cause: new Error(`Error getting subscription package: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Subscription Packages */
    async getAllSubscriptionPackages(includeInactive: boolean = false): Promise<SubscriptionPackageReadModel[]> {
        try {
            const packages =  await this.subscriptionPackageRepository.getAll(includeInactive);
            return packages;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get subscription packages', {
                cause: new Error(`Error getting subscription packages: ${error?.message}`),
            });
        }
    }

    /** ✅ Update Subscription Package */
    async updateSubscriptionPackage(model: UpdateSubscriptionPackageModel): Promise<{ id: string }> {
        try {
            return await this.subscriptionPackageRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update subscription package', {
                cause: new Error(`Error updating subscription package: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Subscription Package */
    async deleteSubscriptionPackage(id: string): Promise<{ id: string }> {
        try {
            return await this.subscriptionPackageRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete subscription package', {
                cause: new Error(`Error deleting subscription package: ${error?.message}`),
            });
        }
    }
}
