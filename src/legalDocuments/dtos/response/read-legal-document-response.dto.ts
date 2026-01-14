import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LegalDocumentReadModel } from 'src/legalDocuments/models/read-legal-document-model';
import { DOCUMENT_TYPES } from 'src/legalDocuments/enums/document-type.enum';

export class ReadLegalDocumentResponseDto {
    @ApiProperty({ example: 'uuid-of-document' })
    id: string;

    @ApiProperty({ example: 'privacy_policy', enum: DOCUMENT_TYPES })
    type: string;

    @ApiProperty({ 
        example: 'This Privacy Policy describes how Remember Me Memorials LLC collects, uses, and protects your personal information...',
        description: 'Full content of the legal document'
    })
    content: string;

    @ApiPropertyOptional({ example: '2025-01-01T00:00:00Z' })
    effectiveDate?: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromModel(model: LegalDocumentReadModel): ReadLegalDocumentResponseDto {
        const dto = new ReadLegalDocumentResponseDto();
        dto.id = model.id;
        dto.type = model.type;
        dto.content = model.content;
        dto.effectiveDate = model.effectiveDate;
        dto.createdAt = model.createdAt;
        dto.updatedAt = model.updatedAt;
        return dto;
    }

    static fromModels(models: LegalDocumentReadModel[]): ReadLegalDocumentResponseDto[] {
        return models.map((model) => this.fromModel(model));
    }
}
