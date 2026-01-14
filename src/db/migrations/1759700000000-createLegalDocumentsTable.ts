import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateLegalDocumentsTable1759700000000 implements MigrationInterface {
    name = 'CreateLegalDocumentsTable1759700000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'legal_documents',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['privacy_policy', 'terms_and_conditions'],
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'effectiveDate',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                uniques: [
                    {
                        name: 'UQ_legal_document_type',
                        columnNames: ['type'],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('legal_documents');
    }
}
