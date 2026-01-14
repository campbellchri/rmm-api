import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMemorialQRCodeRequestDto {
    @ApiProperty({ example: 'uuid-of-memorial' })
    @IsUUID()
    memorialId: string;

    @ApiPropertyOptional({ example: 'https://rememberme.com/memorial/john-doe', description: 'The URL/data encoded in the QR code' })
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
