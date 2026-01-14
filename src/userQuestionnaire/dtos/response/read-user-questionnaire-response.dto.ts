import { ApiProperty } from '@nestjs/swagger';
import { UserQuestionnaireReadModel } from 'src/userQuestionnaire/models/read-user-questionnaire.model';


export class ReadUserQuestionnaireResponseDto {
    @ApiProperty({ example: 'uuid-of-questionnaire' })
    id: string;

    @ApiProperty({ example: 'General Health Questionnaire' })
    title: string;

    @ApiProperty({ example: 'What is your medical history?' })
    questionnaire: string;

    @ApiProperty({ example: 'https://cdn.example.com/icons/questionnaire.png', required: false })
    iconURL?: string;

    @ApiProperty({ example: 'icon-public-id', required: false })
    iconId?: string;

    @ApiProperty({ example: '2025-09-01T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-09-01T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(entity: UserQuestionnaireReadModel): ReadUserQuestionnaireResponseDto {
        const dto = new ReadUserQuestionnaireResponseDto();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.questionnaire = entity.questionnaire;
        dto.iconURL = entity.iconURL;
        dto.iconId = entity.iconId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromEntities(entities: UserQuestionnaireReadModel[]): ReadUserQuestionnaireResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
