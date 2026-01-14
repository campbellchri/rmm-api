import { ApiProperty } from '@nestjs/swagger';
import { LandingModeReadModel } from 'src/landingMode/models/read-landing-mode.model';

export class ReadLandingModeResponseDto {
    @ApiProperty({ example: 'uuid-of-landing-mode' })
    id: string;

    @ApiProperty({ example: 'Dark Mode' })
    title: string;

    @ApiProperty({ example: 'Landing mode for dark theme', required: false })
    description?: string;

    @ApiProperty({ example: 'full-mode', enum: ['full-mode', 'event-mode', 'video-only-mode'] })
    landingModeType: string;

    @ApiProperty({ example: 'icon-file-id', required: false })
    iconId?: string;

    @ApiProperty({ example: 'https://cdn.example.com/icons/darkmode.png', required: false })
    iconURL?: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(entity: LandingModeReadModel): ReadLandingModeResponseDto {
        const dto = new ReadLandingModeResponseDto();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.description = entity.description;
        dto.landingModeType = entity.landingModeType;
        dto.iconId = entity.iconId;
        dto.iconURL = entity.iconURL;
        dto.isActive = entity.isActive;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromEntities(entities: LandingModeReadModel[]): ReadLandingModeResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}

