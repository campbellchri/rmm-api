import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContactUsReadModel } from 'src/contactUs/models/read-contact-us-model';

export class ReadContactUsResponseDto {
    @ApiProperty({ example: 'uuid-of-contact-us' })
    id: string;

    @ApiPropertyOptional({ example: '2118 Thornridge Cir.' })
    addressLine1?: string;

    @ApiPropertyOptional({ example: 'Suite 100' })
    addressLine2?: string;

    @ApiPropertyOptional({ example: 'Syracuse' })
    city?: string;

    @ApiPropertyOptional({ example: 'Connecticut' })
    state?: string;

    @ApiPropertyOptional({ example: '35624' })
    zipCode?: string;

    @ApiPropertyOptional({ example: 'United States' })
    country?: string;

    @ApiPropertyOptional({ example: '(171) 555-2111' })
    phoneNumber?: string;

    @ApiPropertyOptional({ example: 'rememberme@demo.com' })
    emailAddress?: string;

    @ApiPropertyOptional({ example: 'https://www.facebook.com/rememberme' })
    facebookUrl?: string;

    @ApiPropertyOptional({ example: 'https://www.instagram.com/rememberme' })
    instagramUrl?: string;

    @ApiPropertyOptional({ example: 'https://www.twitter.com/rememberme' })
    twitterUrl?: string;

    @ApiPropertyOptional({ example: 'https://www.linkedin.com/company/rememberme' })
    linkedinUrl?: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: ContactUsReadModel): ReadContactUsResponseDto {
        const dto = new ReadContactUsResponseDto();
        dto.id = model.id;
        dto.addressLine1 = model.addressLine1;
        dto.addressLine2 = model.addressLine2;
        dto.city = model.city;
        dto.state = model.state;
        dto.zipCode = model.zipCode;
        dto.country = model.country;
        dto.phoneNumber = model.phoneNumber;
        dto.emailAddress = model.emailAddress;
        dto.facebookUrl = model.facebookUrl;
        dto.instagramUrl = model.instagramUrl;
        dto.twitterUrl = model.twitterUrl;
        dto.linkedinUrl = model.linkedinUrl;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }
}
