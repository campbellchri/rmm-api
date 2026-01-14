import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateContactUsRequestDto {

    @ApiPropertyOptional({ example: '2118 Thornridge Cir.' })
    @IsOptional()
    @IsString()
    addressLine1?: string;

    @ApiPropertyOptional({ example: 'Suite 100' })
    @IsOptional()
    @IsString()
    addressLine2?: string;

    @ApiPropertyOptional({ example: 'Syracuse' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ example: 'Connecticut' })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({ example: '35624' })
    @IsOptional()
    @IsString()
    zipCode?: string;

    @ApiPropertyOptional({ example: 'United States' })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({ example: '(171) 555-2111' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiPropertyOptional({ example: 'rememberme@demo.com' })
    @IsOptional()
    @IsEmail()
    emailAddress?: string;

    // Social Media URLs
    @ApiPropertyOptional({ example: 'https://www.facebook.com/rememberme' })
    @IsOptional()
    @IsString()
    facebookUrl?: string;

    @ApiPropertyOptional({ example: 'https://www.instagram.com/rememberme' })
    @IsOptional()
    @IsString()
    instagramUrl?: string;

    @ApiPropertyOptional({ example: 'https://www.twitter.com/rememberme' })
    @IsOptional()
    @IsString()
    twitterUrl?: string;

    @ApiPropertyOptional({ example: 'https://www.linkedin.com/company/rememberme' })
    @IsOptional()
    @IsString()
    linkedinUrl?: string;
}
