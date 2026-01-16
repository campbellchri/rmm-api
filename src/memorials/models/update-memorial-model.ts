import { UpdateUserMediaModel } from 'src/userMedia/models/update-user-media-model';
import { IPublic } from '../../common/utils/public.type';
import { UpdateMemorialRequestDto } from '../dtos/request/update-memorial-request.dto';
import { UpdateUserTributeModel } from 'src/userTributes/models/update-user-tributes-model';
import { LANDING_MODES_TYPES, LandingModeTypes } from 'src/landingMode/enums/landing-mode.enum';
import { PublishStatuses } from '../enums/publish-status.enum';
import { Genders } from '../enums/gender.enum';

export class UpdateMemorialModel {
  static fromDto(dto: UpdateMemorialRequestDto, id: string): IPublic<UpdateMemorialModel> {
    return {
      id,

      // Basic
      favSaying: dto.favSaying,
      description: dto.description,
      favQuote: dto.favQuote,

      // Landing / Template
      landingModeId: dto.landingModeId,
      landingModeType: dto.landingModeType,
      templateId: dto.templateId,

      // Person Details
      personName: dto.personName,
      personGender: dto.personGender,
      personBirthDate: dto.personBirthDate,
      personDeathDate: dto.personDeathDate,
      personProfilePicture: dto.personProfilePicture,
      profilePictureId: dto.profilePictureId,

      // Featured Photo
      featuredPhotoId: dto.featuredPhotoId,
      featuredPhotoURL: dto.featuredPhotoURL,

      // Life Story
      lifeStoryText: dto.lifeStoryText,
      lifeStoryImageId: dto.lifeStoryImageId,
      lifeStoryImageURL: dto.lifeStoryImageURL,

      // Publishing
      publishStatus: dto.publishStatus,
      slug: dto.slug,
      pageURL: dto.pageURL,

      // Event
      eventStart: dto.eventStart,
      eventDuration: dto.eventDuration,
      autoRevertToFullMode: dto.autoRevertToFullMode,

      // Relations
      userMedia: dto.userMedia,
      userTributes: dto.userTributes,
    };
  }

  id: string;

  // Basic
  favSaying?: string;
  description?: string;
  favQuote?: string;

  // Landing / Template
  landingModeId?: string;
  landingModeType?: LandingModeTypes;
  templateId?: string;

  // Person
  personName?: string;
  personGender?: Genders;
  personBirthDate?: Date;
  personDeathDate?: Date;
  personProfilePicture?: string;
  profilePictureId?: string;

  // Featured Photo
  featuredPhotoId?: string;
  featuredPhotoURL?: string;

  // Life Story
  lifeStoryText?: string;
  lifeStoryImageId?: string;
  lifeStoryImageURL?: string;

  // Publishing
  publishStatus?: PublishStatuses;
  slug?: string;
  pageURL?: string;

  // Event
  eventStart?: Date;
  eventDuration?: string;
  autoRevertToFullMode?: boolean;

  // Relations
  userMedia?: UpdateUserMediaModel[];
  userTributes?: UpdateUserTributeModel[];
}
