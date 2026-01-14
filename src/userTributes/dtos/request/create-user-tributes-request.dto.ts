import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { USER_TRIBUTE_TYPES, UserTributeTypes } from 'src/userTributes/enums/user-tributes.enum';


export class CreateUserTributeRequestDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    authorName: string;

    @ApiProperty({ example: 'You will always be remembered for your kindness and love.' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ enum: USER_TRIBUTE_TYPES })
    @IsEnum(USER_TRIBUTE_TYPES)
    type: UserTributeTypes;

    @ApiPropertyOptional({ example: 'https://cdn.example.com/images/tribute.png' })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional({ example: 'uuid-of-image' })
    @IsOptional()
    @IsString()
    imageId?: string;

    @ApiPropertyOptional({ example: 'uuid-of-memorial' })
    @IsOptional()
    @IsUUID()
    memorialId: string;

    @ApiPropertyOptional({ example: 'uuid-of-user' })
    @IsOptional()
    @IsString()
    userId?: string;
}
