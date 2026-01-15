import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class FeatureMemorialRequestDto {
    @ApiProperty({ example: 'uuid-of-memorial' })
    @IsString()
    memorialId: string;
}
