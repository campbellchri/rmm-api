import { ApiProperty } from '@nestjs/swagger';
import { FaqItemReadModel } from 'src/faq/models/read-faq-item-model';

export class ReadFaqItemResponseDto {
    @ApiProperty({ example: 'uuid-of-faq-item' })
    id: string;

    @ApiProperty({ example: 'How do I reset my password?' })
    question: string;

    @ApiProperty({ example: 'You can reset your password by clicking on the "Forgot Password" link...' })
    answer: string;

    @ApiProperty({ example: 'uuid-of-faq-category' })
    categoryId: string;

    @ApiProperty({ example: 0 })
    order: number;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: FaqItemReadModel): ReadFaqItemResponseDto {
        const dto = new ReadFaqItemResponseDto();
        dto.id = model.id;
        dto.question = model.question;
        dto.answer = model.answer;
        dto.categoryId = model.categoryId;
        dto.order = model.order;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: FaqItemReadModel[]): ReadFaqItemResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
