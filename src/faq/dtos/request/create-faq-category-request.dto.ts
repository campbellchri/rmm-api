import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateFaqCategoryRequestDto {
    @ApiProperty({ description: 'Title of the FAQ category' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Icon URL of the FAQ category' })
    @IsOptional()
    @IsString()
    iconURL?: string;

    @ApiPropertyOptional({ description: 'Icon public ID from Cloudinary or S3' })
    @IsOptional()
    @IsString()
    iconId?: string;

    @ApiPropertyOptional({ description: 'Order/position of the category', default: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
