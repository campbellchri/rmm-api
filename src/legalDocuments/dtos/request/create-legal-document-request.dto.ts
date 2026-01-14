import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DOCUMENT_TYPES } from 'src/legalDocuments/enums/document-type.enum';

export class CreateLegalDocumentRequestDto {
    @ApiProperty({ 
        example: 'privacy_policy', 
        enum: DOCUMENT_TYPES,
        description: 'Type of legal document: privacy_policy or terms_and_conditions'
    })
    @IsNotEmpty()
    @IsEnum(DOCUMENT_TYPES)
    type: string;

    @ApiProperty({ 
        example: 'This Privacy Policy describes how Remember Me Memorials LLC collects, uses, and protects your personal information...',
        description: 'Full content of the legal document (long text)'
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiPropertyOptional({ 
        example: '2025-01-01',
        description: 'Effective date of the document (ISO format)'
    })
    @IsOptional()
    @IsDateString()
    effectiveDate?: Date;
}
