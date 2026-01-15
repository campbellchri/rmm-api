import { IPublic } from '../../common/utils/public.type';
import { UpdateFaqItemRequestDto } from '../dtos/request/update-faq-item-request.dto';

export class UpdateFaqItemModel {
    static fromDto(dto: UpdateFaqItemRequestDto, id: string): IPublic<UpdateFaqItemModel> {
        return {
            id,
            question: dto.question,
            answer: dto.answer,
            categoryId: dto.categoryId,
            order: dto.order,
        };
    }

    id: string;
    question?: string;
    answer?: string;
    categoryId?: string;
    order?: number;
}
