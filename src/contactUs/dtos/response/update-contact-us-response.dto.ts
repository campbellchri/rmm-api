import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactUsResponseDto {
    @ApiProperty({ example: 'uuid-of-contact-us' })
    id: string;

    static fromModel(model: { id: string }): UpdateContactUsResponseDto {
        const dto = new UpdateContactUsResponseDto();
        dto.id = model.id;
        return dto;
    }
}
