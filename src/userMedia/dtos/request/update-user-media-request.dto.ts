import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserMediaRequestDto } from './create-user-media-request.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';


export class UpdateUserMediaRequestDto extends PartialType(CreateUserMediaRequestDto) {
    @ApiPropertyOptional({ example: '7630c9f7-b8eb-4857-8af0-5344bf79afc6' })
    @IsOptional()
    @IsString()
    id?: string;
}
