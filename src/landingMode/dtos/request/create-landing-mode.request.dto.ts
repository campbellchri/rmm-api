import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { LANDING_MODES_TYPES, LandingModeTypes } from 'src/landingMode/enums/landing-mode.enum';

export class CreateLandingModeRequestDto {
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
    @ApiPropertyOptional({ description: 'Icon file ID reference' })
    iconId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(LANDING_MODES_TYPES)
    @ApiPropertyOptional({
        description: 'Type of the landing mode',
        enum: Object.values(LANDING_MODES_TYPES), // ensures Swagger UI shows valid options
        example: LANDING_MODES_TYPES.FULL_MODE,
    })
    landingModeType?: LandingModeTypes;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Icon URL for display' })
    iconURL?: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({ description: 'Status of landing mode (active/inactive)' })
    isActive?: boolean;
}
