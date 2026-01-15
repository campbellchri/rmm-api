import { IPublic } from '../../common/utils/public.type';
import { UpdateFaqCategoryRequestDto } from '../dtos/request/update-faq-category-request.dto';

export class UpdateFaqCategoryModel {
    static fromDto(dto: UpdateFaqCategoryRequestDto, id: string): IPublic<UpdateFaqCategoryModel> {
        return {
            id,
            title: dto.title,
            iconURL: dto.iconURL,
            iconId: dto.iconId,
            order: dto.order,
        };
    }

    id: string;
    title?: string;
    iconURL?: string;
    iconId?: string;
    order?: number;
}
