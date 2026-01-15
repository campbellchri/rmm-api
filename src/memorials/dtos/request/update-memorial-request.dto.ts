import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdateUserMediaRequestDto } from 'src/userMedia/dtos/request/update-user-media-request.dto';
import { UpdateUserTributeRequestDto } from 'src/userTributes/dtos/request/update-user-tributes-request.dto';


export class UpdateMemorialRequestDto {
    @ApiPropertyOptional({ example: '"To live in hearts we leave behind is not to die."' })
    @IsOptional()
    @IsString()
    favSaying?: string;

    @ApiPropertyOptional({ example: 'uuid-of-landing-mode' })
    @IsOptional()
    @IsString()
    landingModeId?: string;

    @ApiPropertyOptional({ example: 'uuid-of-template' })
    @IsOptional()
    @IsString()
    templateId?: string;

    // Person Details
    @ApiPropertyOptional({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    personName?: string;

    @ApiPropertyOptional({ example: '1950-05-10', description: 'Birthdate (ISO format)' })
    @IsOptional()
    @IsDateString()
    personBirthDate?: Date;

    @ApiPropertyOptional({ example: '2024-07-15', description: 'Death date (ISO format)' })
    @IsOptional()
    @IsDateString()
    personDeathDate?: Date;

    @ApiPropertyOptional({ example: 'uuid-of-profile-picture' })
    @IsOptional()
    @IsString()
    profilePictureId?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/photos/john.jpg' })
    @IsOptional()
    @IsString()
    personProfilePicture?: string;

    @ApiPropertyOptional({ example: '"To live in hearts we leave behind is not to die."' })
    @IsOptional()
    @IsString()
    favQuote?: string;

    // Event Details
    @ApiPropertyOptional({ example: '2025-09-01T18:00:00Z' })
    @IsOptional()
    @IsDateString()
    eventStart?: Date;

    @ApiPropertyOptional({ example: '48h', description: 'Duration in hours/days' })
    @IsOptional()
    @IsString()
    eventDuration?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    autoRevertToFullMode?: boolean;

    @ApiPropertyOptional({ type: [UpdateUserMediaRequestDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateUserMediaRequestDto)
    userMedia?: UpdateUserMediaRequestDto[];

    @ApiPropertyOptional({ type: [UpdateUserTributeRequestDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateUserTributeRequestDto)
    userTributes?: UpdateUserTributeRequestDto[];
}