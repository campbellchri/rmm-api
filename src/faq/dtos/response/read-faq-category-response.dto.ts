import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FaqCategoryReadModel } from 'src/faq/models/read-faq-category-model';
import { ReadFaqItemResponseDto } from './read-faq-item-response.dto';

export class ReadFaqCategoryResponseDto {
    @ApiProperty({ example: 'uuid-of-faq-category' })
    id: string;

    @ApiProperty({ example: 'Account & Login' })
    title: string;

    @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
    iconURL?: string;

    @ApiPropertyOptional({ example: 'icon-public-id' })
    iconId?: string;

    @ApiProperty({ example: 0 })
    order: number;

    @ApiProperty({ type: [ReadFaqItemResponseDto] })
    items: ReadFaqItemResponseDto[];

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: FaqCategoryReadModel): ReadFaqCategoryResponseDto {
        const dto = new ReadFaqCategoryResponseDto();
        dto.id = model.id;
        dto.title = model.title;
        dto.iconURL = model.iconURL;
        dto.iconId = model.iconId;
        dto.order = model.order;
        dto.items = model.items.map(item => ReadFaqItemResponseDto.fromModel(item));
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: FaqCategoryReadModel[]): ReadFaqCategoryResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
