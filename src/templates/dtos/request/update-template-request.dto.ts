import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class UpdateTemplateRequestDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    landingModeId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    thumbnailURL?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    thumbnailId?: string;
}
