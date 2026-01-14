import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionPackageReadModel } from 'src/subscriptionPackages/models/read-subscription-package-model';
import { PRICE_UNITS } from 'src/subscriptionPackages/enums/price-unit.enum';
import { STORAGE_UNITS } from 'src/subscriptionPackages/enums/storage-unit.enum';

export class ReadSubscriptionPackageResponseDto {
    @ApiProperty({ example: 'uuid-of-package' })
    id: string;

    @ApiProperty({ example: 'Essential Tribute' })
    packageName: string;

    @ApiPropertyOptional({ example: 'heart-icon' })
    iconId?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/icons/heart.png' })
    iconURL?: string;

    @ApiProperty({ example: 5 })
    price: number;

    @ApiProperty({ example: 'month', enum: PRICE_UNITS })
    priceUnit: string;

    @ApiProperty({ example: 5 })
    storageAmount: number;

    @ApiProperty({ example: 'GB', enum: STORAGE_UNITS })
    storageUnit: string;

    @ApiProperty({ 
        example: [
            'Complete funeral arrangements',
            'Transportation and logistics',
            'Documentation assistance',
            'Traditional ceremony coordination'
        ],
        type: [String]
    })
    features: string[];

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: 0 })
    sortOrder: number;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: SubscriptionPackageReadModel): ReadSubscriptionPackageResponseDto {
        const dto = new ReadSubscriptionPackageResponseDto();
        dto.id = model.id;
        dto.packageName = model.packageName;
        dto.iconId = model.iconId;
        dto.iconURL = model.iconURL;
        dto.price = model.price;
        dto.priceUnit = model.priceUnit;
        dto.storageAmount = model.storageAmount;
        dto.storageUnit = model.storageUnit;
        dto.features = model.features;
        dto.isActive = model.isActive;
        dto.sortOrder = model.sortOrder;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: SubscriptionPackageReadModel[]): ReadSubscriptionPackageResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
