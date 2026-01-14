import { ApiProperty } from '@nestjs/swagger';

export class CreateMemorialQRCodeResponseDto {
    @ApiProperty({ example: 'uuid-of-qr-code' })
    id: string;

    static fromModel(model: { id: string }): CreateMemorialQRCodeResponseDto {
        const dto = new CreateMemorialQRCodeResponseDto();
        dto.id = model.id;
        return dto;
    }
}
