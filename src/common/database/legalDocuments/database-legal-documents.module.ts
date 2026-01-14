import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { LegalDocumentRepository } from './repositories/legal-document.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [LegalDocumentRepository],
    exports: [LegalDocumentRepository],
})
export class DatabaseLegalDocumentsModule { }
