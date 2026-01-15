import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateFaqItemRequestDto {
    @ApiProperty({ description: 'The FAQ question' })
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiProperty({ description: 'The FAQ answer' })
    @IsString()
    @IsNotEmpty()
    answer: string;

    @ApiProperty({ description: 'The ID of the FAQ category' })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @ApiPropertyOptional({ description: 'Order/position of the item within the category', default: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
