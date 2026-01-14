import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMemorialTable1756736892012 implements MigrationInterface {
    name = 'CreateMemorialTable1756736892012';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'memorials',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'favSaying',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'creatorId',
                        type: 'varchar', // ✅ match users.id type
                    },
                    {
                        name: 'landingModeId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'templateId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'personName',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'personBirthDate',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'personDeathDate',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'personProfilePicture',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'profilePictureId',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'favQuote',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'eventStart',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'eventDuration',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'autoRevertToFullMode',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isUnique: true,
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
                foreignKeys: [
                    {
                        columnNames: ['creatorId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['landingModeId'],
                        referencedTableName: 'landing_modes',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                    {
                        columnNames: ['templateId'],
                        referencedTableName: 'templates',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('memorials');
    }
}
