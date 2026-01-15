import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqItemResponseDto {
    @ApiProperty({ example: 'uuid-of-faq-item' })
    id: string;

    static fromModel(model: { id: string }): CreateFaqItemResponseDto {
        const dto = new CreateFaqItemResponseDto();
        dto.id = model.id;
        return dto;
    }
}
