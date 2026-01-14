import { MemorialSayingEntity } from 'src/common/database/memorialSayings/entities/memorial-sayings.entity';
import { IPublic } from '../../common/utils/public.type';

export class MemorialSayingReadModel {
    static fromEntity(entity: MemorialSayingEntity): IPublic<MemorialSayingReadModel> {
        return {
            id: entity.id,
            content: entity.content,
            authorName: entity.authorName,
            memorialId: entity.memorialId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: MemorialSayingEntity[]): IPublic<MemorialSayingReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    content: string;
    authorName?: string;
    memorialId: string;
    createdAt: Date;
    updatedAt: Date;
}
