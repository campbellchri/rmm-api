import { IPublic } from '../../common/utils/public.type';
import { CreateComplaintRequestDto } from '../dtos/request/create-complaint-request.dto';

export class CreateComplaintModel {
    static fromDto(dto: CreateComplaintRequestDto, userId?: string): IPublic<CreateComplaintModel> {
        return {
            userName: dto.userName,
            userEmail: dto.userEmail,
            userPhoneNumber: dto.userPhoneNumber,
            messageType: (dto.messageType as any) || 'message',
            subject: dto.subject,
            messageContent: dto.messageContent,
            userId: userId,
        };
    }

    userName: string;
    userEmail: string;
    userPhoneNumber?: string;
    messageType: string;
    subject?: string;
    messageContent: string;
    userId?: string;
}
