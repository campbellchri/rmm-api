import { SubscriptionPackageEntity } from 'src/common/database/subscriptionPackages/entities/subscription-package.entity';
import { IPublic } from '../../common/utils/public.type';

export class SubscriptionPackageReadModel {
    static fromEntity(entity: SubscriptionPackageEntity): IPublic<SubscriptionPackageReadModel> {
        return {
            id: entity.id,
            packageName: entity.packageName,
            iconId: entity.iconId,
            iconURL: entity.iconURL,
            price: Number(entity.price),
            priceUnit: entity.priceUnit,
            storageAmount: Number(entity.storageAmount),
            storageUnit: entity.storageUnit,
            features: entity.features,
            isActive: entity.isActive,
            sortOrder: entity.sortOrder,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: SubscriptionPackageEntity[]): IPublic<SubscriptionPackageReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    packageName: string;
    iconId?: string;
    iconURL?: string;
    price: number;
    priceUnit: string;
    storageAmount: number;
    storageUnit: string;
    features: string[];
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
