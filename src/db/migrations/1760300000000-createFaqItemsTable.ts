import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateFaqItemsTable1760300000000 implements MigrationInterface {
    name = 'CreateFaqItemsTable1760300000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'faq_items',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'question',
                        type: 'varchar',
                    },
                    {
                        name: 'answer',
                        type: 'text',
                    },
                    {
                        name: 'categoryId',
                        type: 'uuid',
                    },
                    {
                        name: 'order',
                        type: 'integer',
                        default: 0,
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
            }),
        );

        // Create foreign key constraint
        await queryRunner.createForeignKey(
            'faq_items',
            new TableForeignKey({
                columnNames: ['categoryId'],
                referencedTableName: 'faq_categories',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable('faq_items');
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('categoryId') !== -1,
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey('faq_items', foreignKey);
        }
        
        await queryRunner.dropTable('faq_items');
    }
}
