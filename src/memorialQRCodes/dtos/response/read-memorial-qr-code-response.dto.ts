import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MemorialQRCodeReadModel } from 'src/memorialQRCodes/models/read-memorial-qr-code-model';

export class ReadMemorialQRCodeResponseDto {
    @ApiProperty({ example: 'uuid-of-qr-code' })
    id: string;

    @ApiProperty({ example: 'uuid-of-memorial' })
    memorialId: string;

    @ApiPropertyOptional({ example: 'https://rememberme.com/memorial/john-doe' })
    qrCodeData?: string;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/qr-codes/qr-code.png' })
    qrCodeImageURL?: string;

    @ApiPropertyOptional({ example: 'uuid-of-qr-code-image' })
    qrCodeImageId?: string;

    @ApiPropertyOptional({ example: 'QR code for sharing memorial page' })
    description?: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: MemorialQRCodeReadModel): ReadMemorialQRCodeResponseDto {
        const dto = new ReadMemorialQRCodeResponseDto();
        dto.id = model.id;
        dto.memorialId = model.memorialId;
        dto.qrCodeData = model.qrCodeData;
        dto.qrCodeImageURL = model.qrCodeImageURL;
        dto.qrCodeImageId = model.qrCodeImageId;
        dto.description = model.description;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: MemorialQRCodeReadModel[]): ReadMemorialQRCodeResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
