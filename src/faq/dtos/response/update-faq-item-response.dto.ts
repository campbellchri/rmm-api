import { ApiProperty } from '@nestjs/swagger';

export class UpdateFaqItemResponseDto {
    @ApiProperty({ example: 'uuid-of-faq-item' })
    id: string;

    static fromModel(model: { id: string }): UpdateFaqItemResponseDto {
        const dto = new UpdateFaqItemResponseDto();
        dto.id = model.id;
        return dto;
    }
}
