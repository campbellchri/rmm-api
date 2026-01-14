import { Module } from '@nestjs/common';
import { DatabaseLegalDocumentsModule } from 'src/common/database/legalDocuments/database-legal-documents.module';
import { LegalDocumentController } from './controllers/legal-document.controller';
import { LegalDocumentService } from './services/legal-document.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseLegalDocumentsModule, JwtTokenModule],
    controllers: [LegalDocumentController],
    providers: [LegalDocumentService],
    exports: [LegalDocumentService],
})
export class LegalDocumentsModule { }
