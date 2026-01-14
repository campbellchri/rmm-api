import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FeatureMemorialRequestDto {
    @ApiProperty({ example: 'uuid-of-memorial' })
    @IsUUID()
    memorialId: string;
}
