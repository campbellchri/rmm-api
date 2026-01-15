import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { LandingModeTypes } from 'src/landingMode/enums/landing-mode.enum';

export class UpdateLandingModeRequestDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Title of the landing mode' })
    title?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Description of the landing mode' })
    description?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Landing mode type' })
    landingModeType?: LandingModeTypes;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Icon file ID reference' })
    iconId?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Icon URL for display' })
    iconURL?: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({ description: 'Status of landing mode (active/inactive)' })
    isActive?: boolean;
}
