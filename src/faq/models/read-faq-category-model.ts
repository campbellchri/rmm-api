import { FaqCategoryEntity } from 'src/common/database/faq/entities/faq-category.entity';
import { IPublic } from '../../common/utils/public.type';
import { FaqItemReadModel } from './read-faq-item-model';

export class FaqCategoryReadModel {
    static fromEntity(entity: FaqCategoryEntity): IPublic<FaqCategoryReadModel> {
        return {
            id: entity.id,
            title: entity.title,
            iconURL: entity.iconURL,
            iconId: entity.iconId,
            order: entity.order,
            items: entity.items ? FaqItemReadModel.fromEntities(entity.items) : [],
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: FaqCategoryEntity[]): IPublic<FaqCategoryReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    title: string;
    iconURL?: string;
    iconId?: string;
    order: number;
    items: IPublic<FaqItemReadModel>[];
    createdAt: Date;
    updatedAt: Date;
}
