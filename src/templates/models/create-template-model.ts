import { IPublic } from '../../common/utils/public.type';
import { CreateTemplateRequestDto } from '../dtos/request/create-template-request.dto';

export class CreateTemplateModel {
    static fromDto(dto: CreateTemplateRequestDto): IPublic<CreateTemplateModel> {
        return {
            name: dto.name,
            description: dto.description,
            landingModeId: dto.landingModeId,
            thumbnailURL: dto.thumbnailURL,
            thumbnailId: dto.thumbnailId,
        };
    }

    name: string;
    description?: string;
    landingModeId?: string;
    thumbnailURL?: string;
    thumbnailId?: string;
}
