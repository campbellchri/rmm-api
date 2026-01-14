import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContactUsTable1759500000000 implements MigrationInterface {
    name = 'CreateContactUsTable1759500000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contact_us',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'companyName',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'addressLine1',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'addressLine2',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'zipCode',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phoneNumber',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'emailAddress',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'facebookUrl',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'instagramUrl',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'twitterUrl',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'linkedinUrl',
                        type: 'varchar',
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contact_us');
    }
}
