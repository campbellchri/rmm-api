import { IPublic } from '../../common/utils/public.type';
import { CreateContactUsRequestDto } from '../dtos/request/create-contact-us-request.dto';

export class CreateContactUsModel {
    static fromDto(dto: CreateContactUsRequestDto): IPublic<CreateContactUsModel> {
        return {
            addressLine1: dto.addressLine1,
            addressLine2: dto.addressLine2,
            city: dto.city,
            state: dto.state,
            zipCode: dto.zipCode,
            country: dto.country,
            phoneNumber: dto.phoneNumber,
            emailAddress: dto.emailAddress,
            facebookUrl: dto.facebookUrl,
            instagramUrl: dto.instagramUrl,
            twitterUrl: dto.twitterUrl,
            linkedinUrl: dto.linkedinUrl,
        };
    }
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
}
