import { ContactUsEntity } from 'src/common/database/contactUs/entities/contact-us.entity';
import { IPublic } from '../../common/utils/public.type';

export class ContactUsReadModel {
    static fromEntity(entity: ContactUsEntity): IPublic<ContactUsReadModel> {
        return {
            id: entity.id,
            addressLine1: entity.addressLine1,
            addressLine2: entity.addressLine2,
            city: entity.city,
            state: entity.state,
            zipCode: entity.zipCode,
            country: entity.country,
            phoneNumber: entity.phoneNumber,
            emailAddress: entity.emailAddress,
            facebookUrl: entity.facebookUrl,
            instagramUrl: entity.instagramUrl,
            twitterUrl: entity.twitterUrl,
            linkedinUrl: entity.linkedinUrl,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    id: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phoneNumber?: string;
    emailAddress?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
