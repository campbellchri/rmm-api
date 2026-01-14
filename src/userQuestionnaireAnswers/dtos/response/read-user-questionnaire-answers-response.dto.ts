import { ApiProperty } from '@nestjs/swagger';
import { UserQuestionnaireAnswerReadModel } from 'src/userQuestionnaireAnswers/models/read-user-questionnaire-answers.model';

export class ReadUserQuestionnaireAnswerResponseDto {
    @ApiProperty({ example: 'uuid-of-questionnaire-answer' })
    id: string;

    @ApiProperty({ example: 'uuid-of-user' })
    userId: string;

    @ApiProperty({ example: 'uuid-of-questionnaire' })
    questionnaireId: string;

    @ApiProperty({ example: 'uuid-of-answer' })
    answerId: string;

    @ApiProperty({ example: '2025-09-01T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-09-01T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(
        entity: UserQuestionnaireAnswerReadModel,
    ): ReadUserQuestionnaireAnswerResponseDto {
        const dto = new ReadUserQuestionnaireAnswerResponseDto();
        dto.id = entity.id;
        dto.userId = entity.userId;
        dto.questionnaireId = entity.questionnaireId;
        dto.answerId = entity.answerId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromEntities(
        entities: UserQuestionnaireAnswerReadModel[],
    ): ReadUserQuestionnaireAnswerResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
