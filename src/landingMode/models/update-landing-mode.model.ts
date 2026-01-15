import { IPublic } from '../../common/utils/public.type';
import { UpdateLandingModeRequestDto } from '../dtos/request/update-landing-mode.request.dto';
import { LandingModeTypes } from 'src/landingMode/enums/landing-mode.enum';
export class UpdateLandingModeModel {
    static fromDto(
        dto: UpdateLandingModeRequestDto,
        id: string,
    ): IPublic<UpdateLandingModeModel> {
        return {
            id: id,
            title: dto.title,
            description: dto.description,
            landingModeType: dto.landingModeType,
            iconId: dto.iconId,
            iconURL: dto.iconURL,
            isActive: dto.isActive,
        };
    }

    id: string;

    title?: string;
    description?: string;
    landingModeType?: LandingModeTypes;
    iconId?: string;
    iconURL?: string;
    isActive?: boolean;
}
