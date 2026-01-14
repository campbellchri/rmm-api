import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class SimplifyNotificationSettings1760000000000 implements MigrationInterface {
    name = 'SimplifyNotificationSettings1760000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new columns
        await queryRunner.addColumn(
            'userNotificationSettings',
            new TableColumn({
                name: 'title',
                type: 'varchar',
                isNullable: false,
                default: "'Notification Settings'",
            }),
        );

        await queryRunner.addColumn(
            'userNotificationSettings',
            new TableColumn({
                name: 'description',
                type: 'text',
                isNullable: false,
                default: "'Manage your notification preferences'",
            }),
        );

        // Check if userId column exists, if not add it
        const userNotificationSettingsTable = await queryRunner.getTable('userNotificationSettings');
        const userIdColumn = userNotificationSettingsTable?.findColumnByName('userId');
        
        if (!userIdColumn) {
            await queryRunner.addColumn(
                'userNotificationSettings',
                new TableColumn({
                    name: 'userId',
                    type: 'varchar',
                    isNullable: true,
                }),
            );

            // Update existing records to have userId from the user relation
            await queryRunner.query(`
                UPDATE "userNotificationSettings" 
                SET "userId" = (
                    SELECT "users"."id" 
                    FROM "users" 
                    INNER JOIN "userNotificationSettings" AS uns ON uns."userId" = "users"."id"
                    WHERE uns."id" = "userNotificationSettings"."id"
                    LIMIT 1
                )
                WHERE "userId" IS NULL
            `);

            // Make userId NOT NULL after populating
            await queryRunner.query(`
                ALTER TABLE "userNotificationSettings" 
                ALTER COLUMN "userId" SET NOT NULL
            `);
        } else {
            // If userId already exists, just ensure it's NOT NULL
            await queryRunner.query(`
                ALTER TABLE "userNotificationSettings" 
                ALTER COLUMN "userId" SET NOT NULL
            `);
        }

        // Drop foreign key for notificationType
        const notificationTypeForeignKey = userNotificationSettingsTable?.foreignKeys.find(
            fk => fk.columnNames.indexOf('notificationTypeId') !== -1
        );
        if (notificationTypeForeignKey) {
            await queryRunner.dropForeignKey('userNotificationSettings', notificationTypeForeignKey);
        }

        // Drop notificationTypeId column
        await queryRunner.dropColumn('userNotificationSettings', 'notificationTypeId');

        // Check if foreign key for userId already exists
        const userIdForeignKey = userNotificationSettingsTable?.foreignKeys.find(
            fk => fk.columnNames.indexOf('userId') !== -1
        );
        
        // Add foreign key for userId if it doesn't exist
        if (!userIdForeignKey) {
            await queryRunner.createForeignKey(
                'userNotificationSettings',
                new TableForeignKey({
                    columnNames: ['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'CASCADE',
                }),
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key for userId
        const userNotificationSettingsTable = await queryRunner.getTable('userNotificationSettings');
        const userIdForeignKey = userNotificationSettingsTable?.foreignKeys.find(
            fk => fk.columnNames.indexOf('userId') !== -1
        );
        if (userIdForeignKey) {
            await queryRunner.dropForeignKey('userNotificationSettings', userIdForeignKey);
        }

        // Add notificationTypeId column back
        await queryRunner.addColumn(
            'userNotificationSettings',
            new TableColumn({
                name: 'notificationTypeId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        // Drop new columns
        await queryRunner.dropColumn('userNotificationSettings', 'userId');
        await queryRunner.dropColumn('userNotificationSettings', 'description');
        await queryRunner.dropColumn('userNotificationSettings', 'title');
    }
}
