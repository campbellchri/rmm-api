import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    IsUrl
} from 'class-validator';
import { MEDIA_TYPES, MediaTypes } from 'src/userMedia/enums/media.enum';
import { MEDIA_CATEGORIES, MediaCategories } from 'src/userMedia/enums/media-category.enum';

export class CreateUserMediaRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mimeType: string;

    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    fileURL: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fileId?: string;

    @ApiProperty({ enum: MEDIA_TYPES })
    @IsEnum(MEDIA_TYPES)
    type: MediaTypes;

    @ApiPropertyOptional({ enum: MEDIA_CATEGORIES, description: 'Category: profile, featured, gallery, life_story_image' })
    @IsOptional()
    @IsEnum(MEDIA_CATEGORIES)
    category?: MediaCategories;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    memorialId: string;

    @ApiPropertyOptional({ description: 'Will be automatically set from authenticated user if not provided' })
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    photoCaption?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    photoDescription?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    videoTitle?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    videoDescription?: string;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    isMainVideo?: boolean;

    @ApiPropertyOptional({ default: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({ default: 0 })
    @IsOptional()
    @IsNumber()
    sortOrder?: number;
}