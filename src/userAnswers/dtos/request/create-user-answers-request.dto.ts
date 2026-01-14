import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAnswerRequestDto {
    @ApiProperty({ description: 'The user answer text' })
    @IsString()
    @IsNotEmpty()
    answer: string;
}
