import { FaqItemEntity } from 'src/common/database/faq/entities/faq-item.entity';
import { IPublic } from '../../common/utils/public.type';

export class FaqItemReadModel {
    static fromEntity(entity: FaqItemEntity): IPublic<FaqItemReadModel> {
        return {
            id: entity.id,
            question: entity.question,
            answer: entity.answer,
            categoryId: entity.categoryId,
            order: entity.order,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: FaqItemEntity[]): IPublic<FaqItemReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    question: string;
    answer: string;
    categoryId: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
