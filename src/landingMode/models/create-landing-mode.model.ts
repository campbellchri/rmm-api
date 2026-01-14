import { IPublic } from '../../common/utils/public.type';
import { CreateLandingModeRequestDto } from '../dtos/request/create-landing-mode.request.dto';
import { LANDING_MODES_TYPES, LandingModeTypes } from '../enums/landing-mode.enum';


export class CreateLandingModeModel {
    static fromDto(
        dto: CreateLandingModeRequestDto,
    ): IPublic<CreateLandingModeModel> {
        return {
            title: dto.title,
            description: dto.description,
            iconId: dto.iconId,
            iconURL: dto.iconURL,
            isActive: dto.isActive ?? true, // default active if not provided
            landingModeType: dto.landingModeType ?? LANDING_MODES_TYPES.FULL_MODE,
        };
    }
    title: string;
    description?: string;
    iconId?: string;
    iconURL?: string;
    isActive: boolean;
    landingModeType?: LandingModeTypes;
}
