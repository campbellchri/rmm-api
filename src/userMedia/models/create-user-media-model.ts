import { IPublic } from '../../common/utils/public.type';

import { CreateUserMediaRequestDto } from "../dtos/request/create-user-media-request.dto";
import { MediaTypes } from '../enums/media.enum';
import { MediaCategories } from '../enums/media-category.enum';


export class CreateUserMediaModel {
    static fromDto(dto: CreateUserMediaRequestDto): IPublic<CreateUserMediaModel> {
        return {
            mimeType: dto.mimeType,
            fileURL: dto.fileURL,
            fileId: dto.fileId,
            type: dto.type,
            category: dto.category,
            memorialId: dto.memorialId,
            userId: dto.userId,
            photoCaption: dto.photoCaption,
            photoDescription: dto.photoDescription,
            videoTitle: dto.videoTitle,
            videoDescription: dto.videoDescription,
            isMainVideo: dto.isMainVideo ?? false,
            isActive: dto.isActive ?? true,
            sortOrder: dto.sortOrder ?? 0,
        };
    }

    mimeType: string;
    fileURL: string;
    fileId?: string;
    type?: MediaTypes;
    category?: MediaCategories;
    memorialId: string;
    userId?: string;
    photoCaption?: string;
    photoDescription?: string;
    videoTitle?: string;
    videoDescription?: string;
    isMainVideo?: boolean;
    isActive?: boolean;
    sortOrder?: number;
}

