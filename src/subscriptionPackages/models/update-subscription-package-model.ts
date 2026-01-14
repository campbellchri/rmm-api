import { IPublic } from '../../common/utils/public.type';
import { UpdateSubscriptionPackageRequestDto } from '../dtos/request/update-subscription-package-request.dto';

export class UpdateSubscriptionPackageModel {
    static fromDto(dto: UpdateSubscriptionPackageRequestDto, id: string): IPublic<UpdateSubscriptionPackageModel> {
        return {
            id,
            packageName: dto.packageName,
            iconId: dto.iconId,
            iconURL: dto.iconURL,
            price: dto.price,
            priceUnit: dto.priceUnit as any,
            storageAmount: dto.storageAmount,
            storageUnit: dto.storageUnit as any,
            features: dto.features,
            isActive: dto.isActive,
            sortOrder: dto.sortOrder,
        };
    }

    id: string;
    packageName?: string;
    iconId?: string;
    iconURL?: string;
    price?: number;
    priceUnit?: string;
    storageAmount?: number;
    storageUnit?: string;
    features?: string[];
    isActive?: boolean;
    sortOrder?: number;
}
