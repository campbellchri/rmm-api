import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFaqCategoriesTable1760200000000 implements MigrationInterface {
    name = 'CreateFaqCategoriesTable1760200000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'faq_categories',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'iconURL',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'iconId',
                        type: 'varchar',
                        isNullable: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('faq_categories');
    }
}
