import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubscriptionPackagesTable1759800000000 implements MigrationInterface {
    name = 'CreateSubscriptionPackagesTable1759800000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'subscription_packages',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'packageName',
                        type: 'varchar',
                    },
                    {
                        name: 'iconId',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'iconURL',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'priceUnit',
                        type: 'enum',
                        enum: ['month', 'year'],
                        default: "'month'",
                    },
                    {
                        name: 'storageAmount',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'storageUnit',
                        type: 'enum',
                        enum: ['GB', 'TB'],
                        default: "'GB'",
                    },
                    {
                        name: 'features',
                        type: 'text',
                        isArray: true,
                        default: "'{}'",
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'sortOrder',
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
        await queryRunner.dropTable('subscription_packages');
    }
}
