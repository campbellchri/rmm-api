import { ApiProperty } from '@nestjs/swagger';

export class UpdateLegalDocumentResponseDto {
    @ApiProperty({ example: 'uuid-of-document' })
    id: string;

    static fromModel(model: { id: string }): UpdateLegalDocumentResponseDto {
        const dto = new UpdateLegalDocumentResponseDto();
        dto.id = model.id;
        return dto;
    }
}
