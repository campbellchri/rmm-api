import { ApiProperty } from '@nestjs/swagger';

export class FeatureMemorialResponseDto {
    @ApiProperty({ example: 'uuid-of-featured-memorial' })
    id: string;

    @ApiProperty({ example: 'uuid-of-user' })
    userId: string;

    @ApiProperty({ example: 'uuid-of-memorial' })
    memorialId: string;

    @ApiProperty({ example: true, description: 'Whether the memorial is currently featured' })
    isFeature: boolean;

    static fromModel(model: { id: string; userId: string; memorialId: string; isFeature: boolean }): FeatureMemorialResponseDto {
        const dto = new FeatureMemorialResponseDto();
        dto.id = model.id;
        dto.userId = model.userId;
        dto.memorialId = model.memorialId;
        dto.isFeature = model.isFeature;
        return dto;
    }
}
