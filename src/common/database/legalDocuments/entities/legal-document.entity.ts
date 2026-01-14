import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';
import { DOCUMENT_TYPES, DocumentTypes } from 'src/legalDocuments/enums/document-type.enum';

@Entity('legal_documents')
@Unique(['type']) // Ensure only one document of each type exists
export class LegalDocumentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: DOCUMENT_TYPES,
    })
    type: DocumentTypes; // 'privacy_policy' or 'terms_and_conditions'

    @Column({ type: 'text' })
    content: string; // Long text content

    @Column({ nullable: true })
    effectiveDate: Date; // Effective date of the document

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
