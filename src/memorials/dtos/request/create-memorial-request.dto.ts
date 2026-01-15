import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateUserMediaRequestDto } from 'src/userMedia/dtos/request/create-user-media-request.dto';
import { CreateUserTributeRequestDto } from 'src/userTributes/dtos/request/create-user-tributes-request.dto';
import { CreateMemorialSayingRequestDto } from 'src/memorialSayings/dtos/request/create-memorial-saying-request.dto';
import { GENDERS } from 'src/memorials/enums/gender.enum';
import { PUBLISH_STATUSES } from 'src/memorials/enums/publish-status.enum';

export class CreateMemorialRequestDto {
    @ApiPropertyOptional({ example: 'Celebrating the life of John Doe' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: '“To live in hearts we leave behind is not to die.”' })
    @IsOptional()
    @IsString()
    favSaying?: string;


    @ApiPropertyOptional({ example: 'uuid-of-user', description: 'Will be automatically set from authenticated user if not provided' })
    @IsOptional()
    @IsString()
    creatorId?: string;

    @ApiProperty({ example: 'uuid-of-landing-mode' })
    @IsString()
    landingModeId: string;

    @ApiProperty({ example: 'uuid-of-template' })
    @IsString()
    templateId: string;

    // Person Details
    @ApiPropertyOptional({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    personName?: string;

    @ApiPropertyOptional({ example: 'male', enum: GENDERS, description: 'Gender of the deceased' })
    @IsOptional()
    @IsEnum(GENDERS)
    personGender?: string;

    @ApiPropertyOptional({ example: '1950-05-10', description: 'Birthdate (ISO format)' })
    @IsOptional()
    @IsDateString()
    personBirthDate?: Date;

    @ApiPropertyOptional({ example: '2024-07-15', description: 'Death date (ISO format)' })
    @IsOptional()
    @IsDateString()
    personDeathDate?: Date;

    @ApiPropertyOptional({ example: 'uuid-of-profile-picture' })
    @IsOptional()
    @IsString()
    profilePictureId?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/photos/john.jpg' })
    @IsOptional()
    @IsString()
    personProfilePicture?: string;

    @ApiPropertyOptional({ example: '“To live in hearts we leave behind is not to die.”' })
    @IsOptional()
    @IsString()
    favQuote?: string;

    // Featured Photo
    @ApiPropertyOptional({ example: 'uuid-of-featured-photo' })
    @IsOptional()
    @IsString()
    featuredPhotoId?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/photos/featured.jpg' })
    @IsOptional()
    @IsString()
    featuredPhotoURL?: string;

    // Life Story
    @ApiPropertyOptional({ example: 'John was a wonderful father and friend...' })
    @IsOptional()
    @IsString()
    lifeStoryText?: string;

    @ApiPropertyOptional({ example: 'uuid-of-life-story-image' })
    @IsOptional()
    @IsString()
    lifeStoryImageId?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/photos/life-story.jpg' })
    @IsOptional()
    @IsString()
    lifeStoryImageURL?: string;

    // Publish Status
    @ApiPropertyOptional({ example: 'draft', enum: PUBLISH_STATUSES, default: 'draft' })
    @IsOptional()
    @IsEnum(PUBLISH_STATUSES)
    publishStatus?: string;

    // Page URL
    @ApiPropertyOptional({ example: 'https://rememberme.com/memorial/john-doe' })
    @IsOptional()
    @IsString()
    pageURL?: string;

    // QR Code Data
    @ApiPropertyOptional({ example: 'https://rememberme.com/memorial/john-doe', description: 'QR code data (usually the page URL). QR code will be created automatically if provided.' })
    @IsOptional()
    @IsString()
    qrCodeData?: string;

    // Event Details
    @ApiPropertyOptional({ example: '2025-09-01T18:00:00Z' })
    @IsOptional()
    @IsDateString()
    eventStart?: Date;

    @ApiPropertyOptional({ example: '48h', description: 'Duration in hours/days' })
    @IsOptional()
    @IsString()
    eventDuration?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    autoRevertToFullMode?: boolean;

    @ApiPropertyOptional({ type: [CreateUserMediaRequestDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateUserMediaRequestDto)
    userMedia?: CreateUserMediaRequestDto[];

    @ApiPropertyOptional({ type: [CreateUserTributeRequestDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateUserTributeRequestDto)
    userTributes?: CreateUserTributeRequestDto[];

    @ApiPropertyOptional({ type: [CreateMemorialSayingRequestDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateMemorialSayingRequestDto)
    favoriteSayings?: CreateMemorialSayingRequestDto[];
}
