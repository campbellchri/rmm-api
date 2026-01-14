import { ApiProperty } from '@nestjs/swagger';
import { ReadLandingModeResponseDto } from 'src/landingMode/dtos/response/read-landing-mode.response.dto';
import { MemorialReadModel } from 'src/memorials/models/read-memorial-model';
import { ReadUserMediaResponseDto } from 'src/userMedia/dtos/response/read-user-media-response.dto';
import { ReadUserTributeResponseDto } from 'src/userTributes/dtos/response/read-user-tributes-response.dto';
import { ReadMemorialSayingResponseDto } from 'src/memorialSayings/dtos/response/read-memorial-saying-response.dto';
import { ReadMemorialQRCodeResponseDto } from 'src/memorialQRCodes/dtos/response/read-memorial-qr-code-response.dto';

export class ReadMemorialResponseDto {
    @ApiProperty({ example: 'uuid-of-memorial' })
    id: string;

    @ApiProperty({ example: 'Celebrating the life of John Doe', required: false })
    description?: string;

    @ApiProperty({ example: 'John was a wonderful father and friend.', required: false })
    favSaying?: string;

    @ApiProperty({ example: 'uuid-of-creator' })
    creatorId: string;

    @ApiProperty({ example: 'uuid-of-landing-mode' })
    landingModeId: string;

    @ApiProperty({ type: ReadLandingModeResponseDto, required: false })
    landingMode?: ReadLandingModeResponseDto;

    @ApiProperty({ example: 'uuid-of-template' })
    templateId: string;

    // Person Details
    @ApiProperty({ example: 'John Doe', required: false })
    personName?: string;

    @ApiProperty({ example: 'male', enum: ['male', 'female', 'other', 'prefer_not_to_say'], required: false })
    personGender?: string;

    @ApiProperty({ example: '1950-01-01T00:00:00Z', required: false })
    personBirthDate?: Date;

    @ApiProperty({ example: '2020-05-15T00:00:00Z', required: false })
    personDeathDate?: Date;

    @ApiProperty({ example: 'https://cdn.example.com/photos/john.png', required: false })
    personProfilePicture?: string;

    @ApiProperty({ example: 'uuid-of-profile-picture', required: false })
    profilePictureId?: string;

    @ApiProperty({ example: '“Live life to the fullest.”', required: false })
    favQuote?: string;

    // Featured Photo
    @ApiProperty({ example: 'uuid-of-featured-photo', required: false })
    featuredPhotoId?: string;

    @ApiProperty({ example: 'https://cdn.example.com/photos/featured.jpg', required: false })
    featuredPhotoURL?: string;

    // Life Story
    @ApiProperty({ example: 'John was a wonderful father and friend...', required: false })
    lifeStoryText?: string;

    @ApiProperty({ example: 'uuid-of-life-story-image', required: false })
    lifeStoryImageId?: string;

    @ApiProperty({ example: 'https://cdn.example.com/photos/life-story.jpg', required: false })
    lifeStoryImageURL?: string;

    // Publish Status
    @ApiProperty({ example: 'draft', enum: ['draft', 'standard', 'private', 'archived'], required: false })
    publishStatus?: string;

    // Event Details
    @ApiProperty({ example: '2025-09-01T10:00:00Z', required: false })
    eventStart?: Date;

    @ApiProperty({ example: '48h', required: false })
    eventDuration?: string;

    @ApiProperty({ example: true })
    autoRevertToFullMode: boolean;

    // Metadata
    @ApiProperty({ example: 'john-doe-memorial', required: false })
    slug?: string;

    @ApiProperty({ example: 'https://rememberme.com/memorial/john-doe', required: false })
    pageURL?: string;

    @ApiProperty({ example: 'full-mode', enum: ['full-mode', 'event-mode', 'video-only-mode'], description: 'Memorial mode type from landing mode' })
    landingModeType?: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-29T09:21:45Z' })
    updatedAt: Date;

    // 🔹 Relations
    @ApiProperty({ type: [ReadUserMediaResponseDto], required: false })
    userMedia?: ReadUserMediaResponseDto[];

    @ApiProperty({ type: [ReadUserTributeResponseDto], required: false })
    userTributes?: ReadUserTributeResponseDto[];

    @ApiProperty({ type: [ReadMemorialSayingResponseDto], required: false })
    favoriteSayings?: ReadMemorialSayingResponseDto[];

    @ApiProperty({ type: ReadMemorialQRCodeResponseDto, required: false })
    qrCode?: ReadMemorialQRCodeResponseDto;

    static fromModel(model: MemorialReadModel): ReadMemorialResponseDto {
        const dto = new ReadMemorialResponseDto();
        dto.id = model.id;
        dto.description = model.description;
        dto.favSaying = model.favSaying;
        dto.creatorId = model.creatorId;
        dto.landingModeId = model.landingModeId;
        dto.templateId = model.templateId;
        dto.personName = model.personName;
        dto.personGender = model.personGender;
        dto.personBirthDate = model.personBirthDate;
        dto.personDeathDate = model.personDeathDate;
        dto.personProfilePicture = model.personProfilePicture;
        dto.profilePictureId = model.profilePictureId;
        dto.favQuote = model.favQuote;
        dto.featuredPhotoId = model.featuredPhotoId;
        dto.featuredPhotoURL = model.featuredPhotoURL;
        dto.lifeStoryText = model.lifeStoryText;
        dto.lifeStoryImageId = model.lifeStoryImageId;
        dto.lifeStoryImageURL = model.lifeStoryImageURL;
        dto.publishStatus = model.publishStatus;
        dto.eventStart = model.eventStart;
        dto.eventDuration = model.eventDuration;
        dto.autoRevertToFullMode = model.autoRevertToFullMode;
        dto.slug = model.slug;
        dto.pageURL = model.pageURL;
        dto.landingModeType = model.landingModeType;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;

        if (model.landingMode) {
            dto.landingMode = ReadLandingModeResponseDto.fromEntity(model.landingMode);
        }

        dto.userMedia = model.userMedia
            ? model.userMedia.map((media) => ReadUserMediaResponseDto.fromSummary(media))
            : [];

        dto.userTributes = model.userTributes
            ? model.userTributes.map((tribute) => ReadUserTributeResponseDto.fromSummary(tribute))
            : [];

        dto.favoriteSayings = model.favoriteSayings
            ? model.favoriteSayings.map((saying) => ReadMemorialSayingResponseDto.fromModel(saying))
            : [];

        if (model.qrCode) {
            dto.qrCode = ReadMemorialQRCodeResponseDto.fromModel(model.qrCode);
        }

        return dto;
    }

    static fromModels(models: MemorialReadModel[]): ReadMemorialResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
