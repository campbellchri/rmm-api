import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserTributeRequestDto } from './create-user-tributes-request.dto';

import { IsOptional, IsUUID } from 'class-validator';


export class UpdateUserTributeRequestDto extends PartialType(CreateUserTributeRequestDto) {
    @ApiPropertyOptional({ example: '7630c9f7-b8eb-4857-8af0-5344bf79afc6' })
    @IsOptional()
    @IsUUID()
    id?: string;
}
