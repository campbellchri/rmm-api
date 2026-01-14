import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGoogleIdAndFacebookIdToUsers1758000000000 implements MigrationInterface {
    name = 'AddGoogleIdAndFacebookIdToUsers1758000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'googleId',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'facebookId',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'facebookId');
        await queryRunner.dropColumn('users', 'googleId');
    }
}
