import { ApiProperty } from '@nestjs/swagger';
import { UserAnswerReadModel } from 'src/userAnswers/models/read-user-answers.model';


export class ReadUserAnswerResponseDto {
    @ApiProperty({ example: 'uuid-of-answer' })
    id: string;

    @ApiProperty({ example: 'I exercise 3 times a week.' })
    answer: string;

    @ApiProperty({ example: '2025-09-01T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-09-01T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(entity: UserAnswerReadModel): ReadUserAnswerResponseDto {
        const dto = new ReadUserAnswerResponseDto();
        dto.id = entity.id;
        dto.answer = entity.answer;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromEntities(entities: UserAnswerReadModel[]): ReadUserAnswerResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
