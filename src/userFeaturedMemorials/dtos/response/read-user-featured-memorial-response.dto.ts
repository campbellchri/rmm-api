import { ApiProperty } from '@nestjs/swagger';
import { UserFeaturedMemorialReadModel } from 'src/userFeaturedMemorials/models/read-user-featured-memorial-model';
import { ReadMemorialResponseDto } from 'src/memorials/dtos/response/read-memorial-response.dto';

export class ReadUserFeaturedMemorialResponseDto {
    @ApiProperty({ example: 'uuid-of-featured-memorial' })
    id: string;

    @ApiProperty({ example: 'uuid-of-user' })
    userId: string;

    @ApiProperty({ example: 'uuid-of-memorial' })
    memorialId: string;

    @ApiProperty({ example: true, description: 'Whether the memorial is currently featured' })
    isFeature: boolean;

    @ApiProperty({ type: ReadMemorialResponseDto, required: false })
    memorial?: ReadMemorialResponseDto;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: UserFeaturedMemorialReadModel): ReadUserFeaturedMemorialResponseDto {
        const dto = new ReadUserFeaturedMemorialResponseDto();
        dto.id = model.id;
        dto.userId = model.userId;
        dto.memorialId = model.memorialId;
        dto.isFeature = model.isFeature;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        
        if (model.memorial) {
            dto.memorial = ReadMemorialResponseDto.fromModel(model.memorial);
        }
        
        return dto;
    }

    static fromModels(models: UserFeaturedMemorialReadModel[]): ReadUserFeaturedMemorialResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
