import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MESSAGE_TYPES } from '../../enums/message-type.enum';

export class CreateComplaintRequestDto {
    @ApiProperty({ example: 'Perry Wilson' })
    @IsNotEmpty()
    @IsString()
    userName: string;

    @ApiProperty({ example: 'perry.wilson@example.com' })
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @ApiPropertyOptional({ example: '(219) 555-0114' })
    @IsOptional()
    @IsString()
    userPhoneNumber?: string;

    @ApiPropertyOptional({ 
        example: 'message', 
        enum: MESSAGE_TYPES, 
        description: 'Type of message: complaint, suggestion, or message',
        default: 'message'
    })
    @IsOptional()
    @IsEnum(MESSAGE_TYPES)
    messageType?: string;

    @ApiPropertyOptional({ example: 'Question about memorial services' })
    @IsOptional()
    @IsString()
    subject?: string;

    @ApiProperty({ example: 'I would like to know more about your memorial services...' })
    @IsNotEmpty()
    @IsString()
    messageContent: string;
}
