import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordResetFieldsToUsers1760400000000 implements MigrationInterface {
    name = 'AddPasswordResetFieldsToUsers1760400000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'passwordResetToken',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'passwordResetExpires',
                type: 'timestamp',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'passwordResetExpires');
        await queryRunner.dropColumn('users', 'passwordResetToken');
    }
}
