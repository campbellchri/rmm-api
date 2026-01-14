import { CreateUserTributeModel } from 'src/userTributes/models/create-user-tributes-model';
import { IPublic } from '../../common/utils/public.type';
import { CreateMemorialRequestDto } from '../dtos/request/create-memorial-request.dto';
import { CreateUserMediaModel } from 'src/userMedia/models/create-user-media-model';
import { CreateMemorialSayingModel } from 'src/memorialSayings/models/create-memorial-saying-model';

export class CreateMemorialModel {
    static fromDto(dto: CreateMemorialRequestDto): IPublic<CreateMemorialModel> {
        return {
            description: dto.description,
            favSaying: dto.favSaying,
            creatorId: dto.creatorId,
            landingModeId: dto.landingModeId,
            templateId: dto.templateId,
            personName: dto.personName,
            personGender: dto.personGender,
            personBirthDate: dto.personBirthDate,
            personDeathDate: dto.personDeathDate,
            personProfilePicture: dto.personProfilePicture,
            profilePictureId: dto.profilePictureId,
            favQuote: dto.favQuote,
            featuredPhotoId: dto.featuredPhotoId,
            featuredPhotoURL: dto.featuredPhotoURL,
            lifeStoryText: dto.lifeStoryText,
            lifeStoryImageId: dto.lifeStoryImageId,
            lifeStoryImageURL: dto.lifeStoryImageURL,
            publishStatus: dto.publishStatus || 'draft',
            pageURL: dto.pageURL,
            qrCodeData: dto.qrCodeData,
            eventStart: dto.eventStart,
            eventDuration: dto.eventDuration,
            autoRevertToFullMode: dto.autoRevertToFullMode,
            userMedia: dto.userMedia?.map(media => CreateUserMediaModel.fromDto(media)),
            userTributes: dto.userTributes?.map(tribute => CreateUserTributeModel.fromDto(tribute)),
            favoriteSayings: dto.favoriteSayings?.map(saying => CreateMemorialSayingModel.fromDto(saying)),
        };
    }

    description?: string;
    favSaying?: string;
    creatorId: string;
    landingModeId: string;
    templateId: string;

    personName?: string;
    personGender?: string;
    personBirthDate?: Date;
    personDeathDate?: Date;
    personProfilePicture?: string;
    profilePictureId?: string;
    favQuote?: string;

    featuredPhotoId?: string;
    featuredPhotoURL?: string;

    lifeStoryText?: string;
    lifeStoryImageId?: string;
    lifeStoryImageURL?: string;

    publishStatus?: string;
    pageURL?: string;
    qrCodeData?: string;

    eventStart?: Date;
    eventDuration?: string;
    autoRevertToFullMode?: boolean;
    userMedia?: CreateUserMediaModel[];
    userTributes?: CreateUserTributeModel[];
    favoriteSayings?: CreateMemorialSayingModel[];
}
