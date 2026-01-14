import { IPublic } from '../../common/utils/public.type';
import { UpdateUserTributeRequestDto } from '../dtos/request/update-user-tributes-request.dto';
import { UserTributeTypes } from '../enums/user-tributes.enum';

export class UpdateUserTributeModel {
    static fromDto(dto: UpdateUserTributeRequestDto, id?: string): IPublic<UpdateUserTributeModel> {
        return {
            id: id,
            authorName: dto.authorName,
            content: dto.content,
            type: dto.type,
            imageUrl: dto.imageUrl,
            imageId: dto.imageId,
            memorialId: dto.memorialId,
            userId: dto.userId,
        };
    }

    id?: string;
    authorName?: string;
    content?: string;
    type?: UserTributeTypes;
    imageUrl?: string;
    imageId?: string;
    memorialId?: string;
    userId?: string;
}
