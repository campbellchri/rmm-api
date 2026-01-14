import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserQuestionnaireAnswerRequestDto {
    @ApiProperty({ description: 'The ID of the user' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ description: 'The ID of the questionnaire' })
    @IsUUID()
    @IsNotEmpty()
    questionnaireId: string;

    @ApiProperty({ description: 'The ID of the selected answer' })
    @IsUUID()
    @IsNotEmpty()
    answerId: string;
}
