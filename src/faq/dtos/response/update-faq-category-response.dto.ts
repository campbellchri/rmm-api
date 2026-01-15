import { ApiProperty } from '@nestjs/swagger';

export class UpdateFaqCategoryResponseDto {
    @ApiProperty({ example: 'uuid-of-faq-category' })
    id: string;

    static fromModel(model: { id: string }): UpdateFaqCategoryResponseDto {
        const dto = new UpdateFaqCategoryResponseDto();
        dto.id = model.id;
        return dto;
    }
}
