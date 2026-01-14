import { ApiProperty } from '@nestjs/swagger';
import { ReadLandingModeResponseDto } from 'src/landingMode/dtos/response/read-landing-mode.response.dto';
import { MemorialReadModel } from 'src/memorials/models/read-memorial-model';
import { ReadUserMediaResponseDto } from 'src/userMedia/dtos/response/read-user-media-response.dto';

export class ReadVideoMemorialModeResponseDto {
    @ApiProperty({ example: 'uuid-of-memorial' })
    id: string;

    @ApiProperty({ example: 'John was a wonderful father and friend.', required: false })
    favSaying?: string;


    @ApiProperty({ example: '1950-01-01T00:00:00Z', required: false })
    personBirthDate?: Date;

    @ApiProperty({ example: '2020-05-15T00:00:00Z', required: false })
    personDeathDate?: Date;

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

    @ApiProperty({ example: '“Live life to the fullest.”', required: false })
    favQuote?: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-29T09:21:45Z' })
    updatedAt: Date;

    // 🔹 Relations
    @ApiProperty({ type: [ReadUserMediaResponseDto], required: false })
    userMedia?: ReadUserMediaResponseDto[];


    static fromModel(model: MemorialReadModel): ReadVideoMemorialModeResponseDto {
        const dto = new ReadVideoMemorialModeResponseDto();
        dto.id = model.id;
        dto.favSaying = model.favSaying;
        dto.personName = model.personName;
        dto.personBirthDate = model.personBirthDate;
        dto.personDeathDate = model.personDeathDate;
        dto.creatorId = model.creatorId;
        dto.landingModeId = model.landingModeId;
        dto.templateId = model.templateId;
        dto.favQuote = model.favQuote;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;

        if (model.landingMode) {
            dto.landingMode = ReadLandingModeResponseDto.fromEntity(model.landingMode);
        }

        dto.userMedia = model.userMedia
            ? model.userMedia.map((media) => ReadUserMediaResponseDto.fromEventMode(media))
            : [];

        return dto;
    }

    static fromModels(models: MemorialReadModel[]): ReadVideoMemorialModeResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}