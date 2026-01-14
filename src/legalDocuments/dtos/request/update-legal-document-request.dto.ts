import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateLegalDocumentRequestDto {
    @ApiPropertyOptional({ 
        example: 'This Privacy Policy describes how Remember Me Memorials LLC collects, uses, and protects your personal information...',
        description: 'Full content of the legal document (long text)'
    })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({ 
        example: '2025-01-01',
        description: 'Effective date of the document (ISO format)'
    })
    @IsOptional()
    @IsDateString()
    effectiveDate?: Date;
}
