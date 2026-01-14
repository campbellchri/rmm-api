import { UserFeaturedMemorialEntity } from 'src/common/database/userFeaturedMemorials/entities/user-featured-memorial.entity';
import { IPublic } from '../../common/utils/public.type';
import { MemorialReadModel } from 'src/memorials/models/read-memorial-model';

export class UserFeaturedMemorialReadModel {
    static fromEntity(entity: UserFeaturedMemorialEntity): IPublic<UserFeaturedMemorialReadModel> {
        return {
            id: entity.id,
            userId: entity.userId,
            memorialId: entity.memorialId,
            isFeature: entity.isFeature,
            memorial: entity.memorial ? MemorialReadModel.fromEntity(entity.memorial) : undefined,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: UserFeaturedMemorialEntity[]): IPublic<UserFeaturedMemorialReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    userId: string;
    memorialId: string;
    isFeature: boolean;
    memorial?: MemorialReadModel;
    createdAt: Date;
    updatedAt: Date;
}
