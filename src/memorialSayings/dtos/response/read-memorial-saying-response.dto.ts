import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MemorialSayingReadModel } from 'src/memorialSayings/models/read-memorial-saying-model';

export class ReadMemorialSayingResponseDto {
    @ApiProperty({ example: 'uuid-of-saying' })
    id: string;

    @ApiProperty({ example: 'You will always be remembered for your kindness and love.' })
    content: string;

    @ApiPropertyOptional({ example: 'Jane Doe' })
    authorName?: string;

    @ApiProperty({ example: 'uuid-of-memorial' })
    memorialId: string;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: MemorialSayingReadModel): ReadMemorialSayingResponseDto {
        const dto = new ReadMemorialSayingResponseDto();
        dto.id = model.id;
        dto.content = model.content;
        dto.authorName = model.authorName;
        dto.memorialId = model.memorialId;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: MemorialSayingReadModel[]): ReadMemorialSayingResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
