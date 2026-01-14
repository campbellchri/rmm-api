import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ComplaintReadModel } from 'src/complaints/models/read-complaint-model';
import { MESSAGE_TYPES } from '../../enums/message-type.enum';

export class ReadComplaintResponseDto {
    @ApiProperty({ example: 'uuid-of-complaint' })
    id: string;

    @ApiProperty({ example: 'Perry Wilson' })
    userName: string;

    @ApiProperty({ example: 'perry.wilson@example.com' })
    userEmail: string;

    @ApiPropertyOptional({ example: '(219) 555-0114' })
    userPhoneNumber?: string;

    @ApiProperty({ example: 'message', enum: MESSAGE_TYPES })
    messageType: string;

    @ApiPropertyOptional({ example: 'Question about memorial services' })
    subject?: string;

    @ApiProperty({ example: 'I would like to know more about your memorial services...' })
    messageContent: string;

    @ApiPropertyOptional({ example: 'uuid-of-user', description: 'User ID if submitted by authenticated user' })
    userId?: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: ComplaintReadModel): ReadComplaintResponseDto {
        const dto = new ReadComplaintResponseDto();
        dto.id = model.id;
        dto.userName = model.userName;
        dto.userEmail = model.userEmail;
        dto.userPhoneNumber = model.userPhoneNumber;
        dto.messageType = model.messageType;
        dto.subject = model.subject;
        dto.messageContent = model.messageContent;
        dto.userId = model.userId;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: ComplaintReadModel[]): ReadComplaintResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
