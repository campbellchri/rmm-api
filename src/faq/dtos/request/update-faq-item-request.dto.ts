import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';

export class UpdateFaqItemRequestDto {
    @ApiPropertyOptional({ description: 'The FAQ question' })
    @IsOptional()
    @IsString()
    question?: string;

    @ApiPropertyOptional({ description: 'The FAQ answer' })
    @IsOptional()
    @IsString()
    answer?: string;

    @ApiPropertyOptional({ description: 'The ID of the FAQ category' })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiPropertyOptional({ description: 'Order/position of the item within the category' })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
