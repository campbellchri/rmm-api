import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserNotificationSettingsTable1756905645725 implements MigrationInterface {
    name = 'CreateUserNotificationSettingsTable1756905645725';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'userNotificationSettings',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'IsInAppAllowed',
                        type: 'boolean',
                        default: 'true',
                    },
                    {
                        name: 'IsEmailAllowed',
                        type: 'boolean',
                        default: 'false',
                    },
                    {
                        name: 'userId',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'notificationTypeId',
                        type: 'uuid',
                        isNullable: false,
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

        await queryRunner.createForeignKey(
            'userNotificationSettings',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'userNotificationSettings',
            new TableForeignKey({
                columnNames: ['notificationTypeId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'notificationTypes',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('userNotificationSettings');
    }
}
