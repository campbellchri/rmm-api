import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { SubscriptionPackageEntity } from '../entities/subscription-package.entity';
import { CreateSubscriptionPackageModel } from 'src/subscriptionPackages/models/create-subscription-package-model';
import { UpdateSubscriptionPackageModel } from 'src/subscriptionPackages/models/update-subscription-package-model';
import { SubscriptionPackageReadModel } from 'src/subscriptionPackages/models/read-subscription-package-model';

@Injectable()
export class SubscriptionPackageRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create Subscription Package */
    async create(
        model: CreateSubscriptionPackageModel,
        options?: IQueryOptions,
    ): Promise<SubscriptionPackageEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<SubscriptionPackageEntity>(SubscriptionPackageEntity);

        try {
            const entity = new SubscriptionPackageEntity();
            entity.packageName = model.packageName;
            entity.iconId = model.iconId;
            entity.iconURL = model.iconURL;
            entity.price = model.price;
            entity.priceUnit = model.priceUnit as any;
            entity.storageAmount = model.storageAmount;
            entity.storageUnit = model.storageUnit as any;
            entity.features = model.features;
            entity.isActive = model.isActive;
            entity.sortOrder = model.sortOrder;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating subscription package failed', {
                cause: new Error(`Error creating subscription package: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Subscription Package by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<SubscriptionPackageReadModel> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<SubscriptionPackageEntity>(SubscriptionPackageEntity);

        if (!id) {
            throw new BadRequestException('Subscription package ID is required');
        }

        const packageEntity = await repository.findOne({
            where: { id },
        });

        if (!packageEntity) {
            throw new NotFoundException(`Subscription package with ID ${id} not found`);
        }

        return SubscriptionPackageReadModel.fromEntity(packageEntity);
    }

    /** ✅ Get All Subscription Packages */
    async getAll(
        includeInactive: boolean = false,
        options?: IQueryOptions,
    ): Promise<SubscriptionPackageReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<SubscriptionPackageEntity>(SubscriptionPackageEntity);

        const where: any = {};
        if (!includeInactive) {
            where.isActive = true;
        }

        const packages = await repository.find({
            where,
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });

        return SubscriptionPackageReadModel.fromEntities(packages);
    }

    /** ✅ Update Subscription Package */
    async update(
        model: UpdateSubscriptionPackageModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<SubscriptionPackageEntity>(SubscriptionPackageEntity);

        try {
            const packageEntity = await repository.findOne({ where: { id: model.id } });
            if (!packageEntity) {
                throw new NotFoundException('Subscription package not found');
            }

            // Update fields if provided
            packageEntity.packageName = model.packageName ?? packageEntity.packageName;
            packageEntity.iconId = model.iconId ?? packageEntity.iconId;
            packageEntity.iconURL = model.iconURL ?? packageEntity.iconURL;
            packageEntity.price = model.price ?? packageEntity.price;
            packageEntity.priceUnit = model.priceUnit ? (model.priceUnit as any) : packageEntity.priceUnit;
            packageEntity.storageAmount = model.storageAmount ?? packageEntity.storageAmount;
            packageEntity.storageUnit = model.storageUnit ? (model.storageUnit as any) : packageEntity.storageUnit;
            packageEntity.features = model.features ?? packageEntity.features;
            packageEntity.isActive = model.isActive ?? packageEntity.isActive;
            packageEntity.sortOrder = model.sortOrder ?? packageEntity.sortOrder;

            const updated = await repository.save(packageEntity);
            return { id: updated.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Updating subscription package failed', {
                cause: new Error(`Error updating subscription package: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Subscription Package */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<SubscriptionPackageEntity>(SubscriptionPackageEntity);

        try {
            const packageEntity = await repository.findOne({ where: { id } });
            if (!packageEntity) {
                throw new NotFoundException('Subscription package not found');
            }

            await repository.remove(packageEntity);
            return { id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Deleting subscription package failed', {
                cause: new Error(`Error deleting subscription package: ${error?.message}`),
            });
        }
    }
}
