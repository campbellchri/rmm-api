import { UpdateUserMediaModel } from 'src/userMedia/models/update-user-media-model';
import { IPublic } from '../../common/utils/public.type';
import { UpdateMemorialRequestDto } from '../dtos/request/update-memorial-request.dto';
import { UpdateUserTributeModel } from 'src/userTributes/models/update-user-tributes-model';

export class UpdateMemorialModel {
    static fromDto(dto: UpdateMemorialRequestDto, id: string): IPublic<UpdateMemorialModel> {
        return {
            id: id,
            favSaying: dto.favSaying,
            landingModeId: dto.landingModeId,
            templateId: dto.templateId,
            personName: dto.personName,
            personBirthDate: dto.personBirthDate,
            personDeathDate: dto.personDeathDate,
            personProfilePicture: dto.personProfilePicture,
            profilePictureId: dto.profilePictureId,
            favQuote: dto.favQuote,
            eventStart: dto.eventStart,
            eventDuration: dto.eventDuration,
            autoRevertToFullMode: dto.autoRevertToFullMode,
            userMedia: dto.userMedia,
            userTributes: dto.userTributes,

        };
    }

    id: string;
    favSaying?: string;
    landingModeId?: string;
    templateId?: string;

    personName?: string;
    personBirthDate?: Date;
    personDeathDate?: Date;
    personProfilePicture?: string;
    profilePictureId?: string;
    favQuote?: string;

    eventStart?: Date;
    eventDuration?: string;
    autoRevertToFullMode?: boolean;
    userMedia?: UpdateUserMediaModel[];
    userTributes?: UpdateUserTributeModel[];
}
