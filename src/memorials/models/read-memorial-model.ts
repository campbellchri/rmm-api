import { MemorialEntity } from 'src/common/database/memorials/entities/memeorial.entity';
import { IPublic } from '../../common/utils/public.type';
import { UserMediaReadModel } from 'src/userMedia/models/read-user-media-model';
import { UserTributeReadModel } from 'src/userTributes/models/read-user-tributes-model';
import { LandingModeReadModel } from 'src/landingMode/models/read-landing-mode.model';
import { MemorialSayingReadModel } from 'src/memorialSayings/models/read-memorial-saying-model';
import { MemorialQRCodeReadModel } from 'src/memorialQRCodes/models/read-memorial-qr-code-model';


export class MemorialReadModel {
    static fromEntity(entity: MemorialEntity): IPublic<MemorialReadModel> {
        return {
            id: entity.id,
            description: entity.description,
            favSaying: entity.favSaying,
            creatorId: entity.creatorId,
            landingModeId: entity.landingModeId,
            templateId: entity.templateId,
            personName: entity.personName,
            personGender: entity.personGender,
            personBirthDate: entity.personBirthDate,
            personDeathDate: entity.personDeathDate,
            personProfilePicture: entity.personProfilePicture,
            profilePictureId: entity.profilePictureId,
            favQuote: entity.favQuote,
            featuredPhotoId: entity.featuredPhotoId,
            featuredPhotoURL: entity.featuredPhotoURL,
            lifeStoryText: entity.lifeStoryText,
            lifeStoryImageId: entity.lifeStoryImageId,
            lifeStoryImageURL: entity.lifeStoryImageURL,
            publishStatus: entity.publishStatus,
            eventStart: entity.eventStart,
            eventDuration: entity.eventDuration,
            autoRevertToFullMode: entity.autoRevertToFullMode,
            slug: entity.slug,
            pageURL: entity.pageURL,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,

            // Import read models here 👇
            landingMode: entity.landingMode ? LandingModeReadModel.fromEntity(entity.landingMode) : null,
            landingModeType: entity.landingMode?.landingModeType, // Explicitly include mode type
            userMedia: entity.media ? UserMediaReadModel.fromEntities(entity.media) : [],
            userTributes: entity.tributes ? UserTributeReadModel.fromEntities(entity.tributes) : [],
            favoriteSayings: entity.sayings ? MemorialSayingReadModel.fromEntities(entity.sayings) : [],
            qrCode: entity.qrCodes && entity.qrCodes.length > 0 
                ? MemorialQRCodeReadModel.fromEntity(entity.qrCodes[0]) // Get the most recent QR code
                : null,
        };
    }

    static fromEntities(entities: MemorialEntity[]): IPublic<MemorialReadModel>[] {
        return entities.map(this.fromEntity);
    }

    id: string;
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

    eventStart?: Date;
    eventDuration?: string;
    autoRevertToFullMode: boolean;

    slug?: string;
    pageURL?: string;

    createdAt: Date;
    updatedAt: Date;

    landingMode?: LandingModeReadModel;
    landingModeType?: string; // Explicit mode type: 'full-mode', 'event-mode', 'video-only-mode'
    // Relations
    userMedia?: UserMediaReadModel[];
    userTributes?: UserTributeReadModel[];
    favoriteSayings?: MemorialSayingReadModel[];
    qrCode?: MemorialQRCodeReadModel;
}
