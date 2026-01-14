import { IPublic } from '../../common/utils/public.type';
import { UpdateTemplateRequestDto } from '../dtos/request/update-template-request.dto';


export class UpdateTemplateModel {
    static fromDto(dto: UpdateTemplateRequestDto, id: string): IPublic<UpdateTemplateModel> {
        return {
            id,
            name: dto.name,
            description: dto.description,
            landingModeId: dto.landingModeId,
            thumbnailURL: dto.thumbnailURL,
            thumbnailId: dto.thumbnailId,
        };
    }

    id: string;
    name?: string;
    description?: string;
    landingModeId?: string;
    thumbnailURL?: string;
    thumbnailId?: string;
}