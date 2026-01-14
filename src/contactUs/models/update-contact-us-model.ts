import { IPublic } from '../../common/utils/public.type';
import { UpdateContactUsRequestDto } from '../dtos/request/update-contact-us-request.dto';

export class UpdateContactUsModel {
    static fromDto(dto: UpdateContactUsRequestDto, id?: string): IPublic<UpdateContactUsModel> {
        return {
            id: id,
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

    id?: string;
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
