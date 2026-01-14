import { ApiProperty } from '@nestjs/swagger';
import { TemplateReadModel } from 'src/templates/models/read-template-model';
import { ReadLandingModeResponseDto } from 'src/landingMode/dtos/response/read-landing-mode.response.dto';

export class ReadTemplateResponseDto {
    @ApiProperty({ example: 'uuid-of-template' })
    id: string;

    @ApiProperty({ example: 'Memorial Template A' })
    name: string;

    @ApiProperty({ example: 'This template is used for modern memorials', required: false })
    description?: string;

    @ApiProperty({ example: 'uuid-of-landing-mode', required: false })
    landingModeId?: string;

    @ApiProperty({ type: ReadLandingModeResponseDto, required: false })
    landingMode?: ReadLandingModeResponseDto;

    @ApiProperty({ example: 'https://cdn.example.com/templates/template-thumbnail.png', required: false })
    thumbnailURL?: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(entity: TemplateReadModel): ReadTemplateResponseDto {
        const dto = new ReadTemplateResponseDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.description = entity.description;
        dto.landingModeId = entity.landingModeId;
        dto.thumbnailURL = entity.thumbnailURL;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        
        if (entity.landingMode) {
            dto.landingMode = ReadLandingModeResponseDto.fromEntity(entity.landingMode);
        }
        
        return dto;
    }

    static fromEntities(entities: TemplateReadModel[]): ReadTemplateResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
