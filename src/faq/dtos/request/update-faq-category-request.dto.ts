import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateFaqCategoryRequestDto {
    @ApiPropertyOptional({ description: 'Title of the FAQ category' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Icon URL of the FAQ category' })
    @IsOptional()
    @IsString()
    iconURL?: string;

    @ApiPropertyOptional({ description: 'Icon public ID from Cloudinary or S3' })
    @IsOptional()
    @IsString()
    iconId?: string;

    @ApiPropertyOptional({ description: 'Order/position of the category' })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
