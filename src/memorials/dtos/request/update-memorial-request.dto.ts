import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LANDING_MODES_TYPES, LandingModeTypes } from 'src/landingMode/enums/landing-mode.enum';
import { GENDERS, Genders } from 'src/memorials/enums/gender.enum';
import { PUBLISH_STATUSES, PublishStatuses } from 'src/memorials/enums/publish-status.enum';
import { UpdateUserMediaRequestDto } from 'src/userMedia/dtos/request/update-user-media-request.dto';
import { UpdateUserTributeRequestDto } from 'src/userTributes/dtos/request/update-user-tributes-request.dto';

export class UpdateMemorialRequestDto {
  @ApiPropertyOptional({ example: '"To live in hearts we leave behind is not to die."' })
  @IsOptional()
  @IsString()
  favSaying?: string;

  @ApiPropertyOptional({ example: 'uuid-of-landing-mode' })
  @IsOptional()
  @IsString()
  landingModeId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-template' })
  @IsOptional()
  @IsString()
  templateId?: string;

  // Person Details
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  personName?: string;

  @ApiPropertyOptional({ example: 'male' })
  @IsOptional()
  @IsEnum(GENDERS)
  personGender?: Genders;

  @ApiPropertyOptional({ example: '1950-05-10' })
  @IsOptional()
  @IsDateString()
  personBirthDate?: Date;

  @ApiPropertyOptional({ example: '2024-07-15' })
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  favQuote?: string;

  // Featured Photo
  @ApiPropertyOptional({ example: 'uuid-of-featured-photo' })
  @IsOptional()
  @IsString()
  featuredPhotoId?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/featured.jpg' })
  @IsOptional()
  @IsString()
  featuredPhotoURL?: string;

  // Life Story
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lifeStoryText?: string;

  @ApiPropertyOptional({ example: 'uuid-of-life-story-image' })
  @IsOptional()
  @IsString()
  lifeStoryImageId?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/lifestory.jpg' })
  @IsOptional()
  @IsString()
  lifeStoryImageURL?: string;

  // Publishing
  @ApiPropertyOptional({ example: PUBLISH_STATUSES.STANDARD })
  @IsOptional()
  @IsEnum(PUBLISH_STATUSES)
  publishStatus?: PublishStatuses;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pageURL?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(LANDING_MODES_TYPES)
  landingModeType?: LandingModeTypes;

  // Event Details
  @ApiPropertyOptional({ example: '2025-09-01T18:00:00Z' })
  @IsOptional()
  @IsDateString()
  eventStart?: Date;

  @ApiPropertyOptional({ example: '48h' })
  @IsOptional()
  @IsString()
  eventDuration?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  autoRevertToFullMode?: boolean;

  // System fields (optional for update requests)
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  // Relations
  @ApiPropertyOptional({ type: [UpdateUserMediaRequestDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserMediaRequestDto)
  userMedia?: UpdateUserMediaRequestDto[];

  @ApiPropertyOptional({ type: [UpdateUserTributeRequestDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserTributeRequestDto)
  userTributes?: UpdateUserTributeRequestDto[];
}
