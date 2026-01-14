import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemorialQRCodeRequestDto {
    @ApiPropertyOptional({ example: 'https://rememberme.com/memorial/john-doe' })
    @IsOptional()
    @IsString()
    qrCodeData?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/qr-codes/qr-code.png' })
    @IsOptional()
    @IsString()
    qrCodeImageURL?: string;

    @ApiPropertyOptional({ example: 'uuid-of-qr-code-image' })
    @IsOptional()
    @IsString()
    qrCodeImageId?: string;

    @ApiPropertyOptional({ example: 'QR code for sharing memorial page' })
    @IsOptional()
    @IsString()
    description?: string;
}
