import { IPublic } from '../../common/utils/public.type';
import { CreateFaqItemRequestDto } from '../dtos/request/create-faq-item-request.dto';

export class CreateFaqItemModel {
    static fromDto(dto: CreateFaqItemRequestDto): IPublic<CreateFaqItemModel> {
        return {
            question: dto.question,
            answer: dto.answer,
            categoryId: dto.categoryId,
            order: dto.order,
        };
    }

    question: string;
    answer: string;
    categoryId: string;
    order?: number;
}
