import { ComplaintEntity } from 'src/common/database/complaints/entities/complaint.entity';
import { IPublic } from '../../common/utils/public.type';

export class ComplaintReadModel {
    static fromEntity(entity: ComplaintEntity): IPublic<ComplaintReadModel> {
        return {
            id: entity.id,
            userName: entity.userName,
            userEmail: entity.userEmail,
            userPhoneNumber: entity.userPhoneNumber,
            messageType: entity.messageType,
            subject: entity.subject,
            messageContent: entity.messageContent,
            userId: entity.userId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: ComplaintEntity[]): IPublic<ComplaintReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    userName: string;
    userEmail: string;
    userPhoneNumber?: string;
    messageType: string;
    subject?: string;
    messageContent: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}
