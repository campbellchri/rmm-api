import { IPublic } from '../../common/utils/public.type';
import { CreateUserTributeRequestDto } from '../dtos/request/create-user-tributes-request.dto';
import { UserTributeTypes } from '../enums/user-tributes.enum';

export class CreateUserTributeModel {
    static fromDto(dto: CreateUserTributeRequestDto): IPublic<CreateUserTributeModel> {
        return {
            authorName: dto.authorName,
            content: dto.content,
            type: dto.type,
            imageUrl: dto.imageUrl,
            imageId: dto.imageId,
            memorialId: dto.memorialId,
            userId: dto.userId,
        };
    }

    authorName: string;
    content: string;
    type: UserTributeTypes;
    imageUrl?: string;
    imageId?: string;
    memorialId: string;
    userId?: string;
}
