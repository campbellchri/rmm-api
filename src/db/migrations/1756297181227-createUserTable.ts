import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1747929820393 implements MigrationInterface {
    name?: 'CreateUsersTable1747929820393';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'firstName',
                        type: 'varchar',
                    },
                    {
                        name: 'lastName',
                        type: 'varchar',
                    },
                    {
                        name: 'callingCode',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'roles',
                        type: 'enum',
                        enum: ['admin', 'user'],
                        isArray: true,
                        default: `'{user}'`,
                        isNullable: true,
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                        isNullable: true,
                    },

                    { name: 'country', type: 'varchar', isNullable: true },
                    { name: 'street1', type: 'varchar', isNullable: true },
                    { name: 'street2', type: 'varchar', isNullable: true },
                    { name: 'city', type: 'varchar', isNullable: true },
                    { name: 'state', type: 'varchar', isNullable: true },
                    { name: 'postal', type: 'varchar', isNullable: true },

                    { name: 'photoId', type: 'varchar', isNullable: true },
                    { name: 'photoURL', type: 'varchar', isNullable: true },

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
        await queryRunner.dropTable('users');
    }
}
