import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTemplatesTable1756469873139 implements MigrationInterface {
    name = 'CreateTemplatesTable1756469873139';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create templates table
        await queryRunner.createTable(
            new Table({
                name: 'templates',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'landingModeId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'thumbnailURL',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'thumbnailId',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp with time zone',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp with time zone',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        // Add foreign key to landing_modes
        await queryRunner.createForeignKey(
            'templates',
            new TableForeignKey({
                columnNames: ['landingModeId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'landing_modes',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key
        const table = await queryRunner.getTable('templates');
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('landingModeId') !== -1,
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey('templates', foreignKey);
        }

        // Drop table
        await queryRunner.dropTable('templates');
    }
}

