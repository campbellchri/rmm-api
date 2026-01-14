import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateComplaintsTable1759600000000 implements MigrationInterface {
    name = 'CreateComplaintsTable1759600000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create message_type_enum
        await queryRunner.query(`
            CREATE TYPE message_type_enum AS ENUM ('complaint', 'suggestion', 'message');
        `);

        await queryRunner.createTable(
            new Table({
                name: 'complaints',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'userName',
                        type: 'varchar',
                    },
                    {
                        name: 'userEmail',
                        type: 'varchar',
                    },
                    {
                        name: 'userPhoneNumber',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'messageType',
                        type: 'enum',
                        enum: ['complaint', 'suggestion', 'message'],
                        default: "'message'",
                    },
                    {
                        name: 'subject',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'messageContent',
                        type: 'text',
                    },
                    {
                        name: 'userId',
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
        await queryRunner.dropTable('complaints');
        await queryRunner.query(`DROP TYPE IF EXISTS message_type_enum;`);
    }
}
