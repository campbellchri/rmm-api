import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNotificationSettingsFields1759900000000 implements MigrationInterface {
    name = 'AddNotificationSettingsFields1759900000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'userNotificationSettings',
            new TableColumn({
                name: 'IsDesktopNotificationAllowed',
                type: 'boolean',
                default: true,
            }),
        );

        await queryRunner.addColumn(
            'userNotificationSettings',
            new TableColumn({
                name: 'IsUnreadBadgeEnabled',
                type: 'boolean',
                default: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('userNotificationSettings', 'IsUnreadBadgeEnabled');
        await queryRunner.dropColumn('userNotificationSettings', 'IsDesktopNotificationAllowed');
    }
}
