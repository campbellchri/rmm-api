import { IPublic } from '../../common/utils/public.type';
import { CreateFaqCategoryRequestDto } from '../dtos/request/create-faq-category-request.dto';

export class CreateFaqCategoryModel {
    static fromDto(dto: CreateFaqCategoryRequestDto): IPublic<CreateFaqCategoryModel> {
        return {
            title: dto.title,
            iconURL: dto.iconURL,
            iconId: dto.iconId,
            order: dto.order,
        };
    }

    title: string;
    iconURL?: string;
    iconId?: string;
    order?: number;
}
