import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMemorialSayingRequestDto {
    @ApiProperty({ example: 'You will always be remembered for your kindness and love.' })
    @IsString()
    content: string;

    @ApiPropertyOptional({ example: 'Jane Doe' })
    @IsOptional()
    @IsString()
    authorName?: string;
}
