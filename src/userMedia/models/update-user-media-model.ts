import { IPublic } from '../../common/utils/public.type';
import { UpdateUserMediaRequestDto } from "../dtos/request/update-user-media-request.dto";
import { MediaTypes } from '../enums/media.enum';

export class UpdateUserMediaModel {
    static fromDto(dto: UpdateUserMediaRequestDto, id?: string): IPublic<UpdateUserMediaModel> {
        return {
            id: id,
            mimeType: dto.mimeType,
            fileURL: dto.fileURL,
            fileId: dto.fileId,
            type: dto.type,
            memorialId: dto.memorialId,
            userId: dto.userId,
            photoCaption: dto.photoCaption,
            photoDescription: dto.photoDescription,
            videoTitle: dto.videoTitle,
            isMainVideo: dto.isMainVideo,
            isActive: dto.isActive,
            sortOrder: dto.sortOrder,
        };
    }

    id?: string;
    mimeType?: string;
    fileURL?: string;
    fileId?: string;
    type?: MediaTypes;
    memorialId?: string;
    userId?: string;
    photoCaption?: string;
    photoDescription?: string;
    videoTitle?: string;
    isMainVideo?: boolean;
    isActive?: boolean;
    sortOrder?: number;
}
