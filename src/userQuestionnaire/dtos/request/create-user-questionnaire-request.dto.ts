import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserQuestionnaireRequestDto {
    @ApiProperty({ description: 'Title of the questionnaire' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Questionnaire text or description' })
    @IsString()
    @IsNotEmpty()
    questionnaire: string;

    @ApiProperty({ description: 'Icon URL of the questionnaire', required: false })
    @IsString()
    @IsOptional()
    iconURL?: string;

    @ApiProperty({ description: 'Icon public ID from Cloudinary or S3', required: false })
    @IsString()
    @IsOptional()
    iconId?: string;
}
