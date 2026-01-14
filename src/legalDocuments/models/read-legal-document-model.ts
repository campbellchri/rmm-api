import { LegalDocumentEntity } from 'src/common/database/legalDocuments/entities/legal-document.entity';
import { IPublic } from '../../common/utils/public.type';

export class LegalDocumentReadModel {
    static fromEntity(entity: LegalDocumentEntity): IPublic<LegalDocumentReadModel> {
        return {
            id: entity.id,
            type: entity.type,
            content: entity.content,
            effectiveDate: entity.effectiveDate,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: LegalDocumentEntity[]): IPublic<LegalDocumentReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    type: string;
    content: string;
    effectiveDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
