
import { UserTributeEntity } from 'src/common/database/userTributes/entities/user-tributes.entity';
import { IPublic } from '../../common/utils/public.type';
import { UserTributeTypes } from '../enums/user-tributes.enum';

export class UserTributeReadModel {
    static fromEntity(entity: UserTributeEntity): IPublic<UserTributeReadModel> {
        return {
            id: entity.id,
            authorName: entity.authorName,
            content: entity.content,
            type: entity.type,
            imageUrl: entity.imageUrl,
            imageId: entity.imageId,
            memorialId: entity.memorialId,
            userId: entity.userId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: UserTributeEntity[]): IPublic<UserTributeReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    authorName: string;
    content: string;
    type: UserTributeTypes;
    imageUrl?: string;
    imageId?: string;
    memorialId?: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}
