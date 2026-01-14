import { UserMediaEntity } from 'src/common/database/userMedia/entities/user-media.entity';
import { IPublic } from '../../common/utils/public.type';
import { MediaTypes } from '../enums/media.enum';

export class UserMediaReadModel {
    static fromEntity(entity: UserMediaEntity): IPublic<UserMediaReadModel> {
        return {
            id: entity.id,
            mimeType: entity.mimeType,
            fileURL: entity.fileURL,
            fileId: entity.fileId,
            type: entity.type,
            memorialId: entity.memorialId,
            userId: entity.userId,
            photoCaption: entity.photoCaption,
            photoDescription: entity.photoDescription,
            videoTitle: entity.videoTitle,
            isMainVideo: entity.isMainVideo,
            isActive: entity.isActive,
            sortOrder: entity.sortOrder,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: UserMediaEntity[]): IPublic<UserMediaReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    mimeType: string;
    fileURL: string;
    fileId?: string;
    type?: MediaTypes;
    memorialId: string;
    userId: string;
    photoCaption?: string;
    photoDescription?: string;
    videoTitle?: string;
    isMainVideo: boolean;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
