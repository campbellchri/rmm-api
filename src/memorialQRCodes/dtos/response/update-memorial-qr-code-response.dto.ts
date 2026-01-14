import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemorialQRCodeResponseDto {
    @ApiProperty({ example: 'uuid-of-qr-code' })
    id: string;

    static fromModel(model: { id: string }): UpdateMemorialQRCodeResponseDto {
        const dto = new UpdateMemorialQRCodeResponseDto();
        dto.id = model.id;
        return dto;
    }
}
