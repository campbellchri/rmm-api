import { ApiProperty } from '@nestjs/swagger';
import { IPublic } from "src/common/utils/public.type";
import { USER_TRIBUTE_TYPES, UserTributeTypes } from 'src/userTributes/enums/user-tributes.enum';
import { UserTributeReadModel } from 'src/userTributes/models/read-user-tributes-model';

export class ReadUserTributeResponseDto {
    @ApiProperty({ example: 'uuid-of-tribute' })
    id: string;

    @ApiProperty({ example: 'Jane Doe' })
    authorName: string;

    @ApiProperty({
        example: 'You will always be remembered for your kindness and love.',
    })
    content: string;

    @ApiProperty({ enum: USER_TRIBUTE_TYPES, example: USER_TRIBUTE_TYPES.TRIBUTE })
    type: UserTributeTypes;

    @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
    imageUrl: string;

    @ApiProperty({})
    imageId: string;

    @ApiProperty({ example: 'uuid-of-memorial' })
    memorialId: string;

    @ApiProperty({ example: 'uuid-of-user', required: false })
    userId?: string;

    @ApiProperty({
        example: 'approved',
        description: 'Moderation status',
    })
    status: 'pending' | 'approved' | 'rejected';

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(entity: UserTributeReadModel): IPublic<ReadUserTributeResponseDto> {
        const dto = new ReadUserTributeResponseDto();
        dto.id = entity.id;
        dto.authorName = entity.authorName;
        dto.content = entity.content;
        dto.type = entity.type;
        dto.imageUrl = entity.imageUrl;
        dto.imageId = entity.imageId;
        dto.memorialId = entity.memorialId;
        dto.userId = entity.userId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromSummary(entity: UserTributeReadModel): IPublic<ReadUserTributeResponseDto> {
        const dto = new ReadUserTributeResponseDto();
        dto.id = entity.id;
        dto.authorName = entity.authorName;
        dto.content = entity.content;
        dto.type = entity.type;
        dto.memorialId = entity.memorialId;
        dto.userId = entity.userId;
        dto.imageId = entity.imageId;
        return dto;
    }


    static fromEntities(entities: UserTributeReadModel[]): IPublic<ReadUserTributeResponseDto>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
