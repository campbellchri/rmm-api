import { IPublic } from '../../common/utils/public.type';
import { CreateMemorialSayingRequestDto } from '../dtos/request/create-memorial-saying-request.dto';

export class CreateMemorialSayingModel {
    static fromDto(dto: CreateMemorialSayingRequestDto): IPublic<CreateMemorialSayingModel> {
        return {
            content: dto.content,
            authorName: dto.authorName,
        };
    }

    content: string;
    authorName?: string;
}
