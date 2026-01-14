import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateTemplateRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
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
