import { ApiProperty } from '@nestjs/swagger';

export class CreateLegalDocumentResponseDto {
    @ApiProperty({ example: 'uuid-of-document' })
    id: string;

    static fromModel(model: { id: string }): CreateLegalDocumentResponseDto {
        const dto = new CreateLegalDocumentResponseDto();
        dto.id = model.id;
        return dto;
    }
}
