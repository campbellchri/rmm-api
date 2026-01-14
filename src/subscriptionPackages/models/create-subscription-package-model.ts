import { IPublic } from '../../common/utils/public.type';
import { CreateSubscriptionPackageRequestDto } from '../dtos/request/create-subscription-package-request.dto';
import { PRICE_UNITS } from '../enums/price-unit.enum';
import { STORAGE_UNITS } from '../enums/storage-unit.enum';

export class CreateSubscriptionPackageModel {
    static fromDto(dto: CreateSubscriptionPackageRequestDto): IPublic<CreateSubscriptionPackageModel> {
        return {
            packageName: dto.packageName,
            iconId: dto.iconId,
            iconURL: dto.iconURL,
            price: dto.price,
            priceUnit: (dto.priceUnit as any) ?? PRICE_UNITS.MONTH,
            storageAmount: dto.storageAmount,
            storageUnit: (dto.storageUnit as any) ?? STORAGE_UNITS.GB,
            features: dto.features,
            isActive: dto.isActive ?? true,
            sortOrder: dto.sortOrder ?? 0,
        };
    }

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
}
