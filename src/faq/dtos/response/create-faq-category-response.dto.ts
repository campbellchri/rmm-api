import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqCategoryResponseDto {
    @ApiProperty({ example: 'uuid-of-faq-category' })
    id: string;

    static fromModel(model: { id: string }): CreateFaqCategoryResponseDto {
        const dto = new CreateFaqCategoryResponseDto();
        dto.id = model.id;
        return dto;
    }
}
