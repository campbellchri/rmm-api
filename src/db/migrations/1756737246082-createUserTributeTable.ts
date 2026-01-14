import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTributeTable1756737246082 implements MigrationInterface {
    name = 'CreateUserTributeTable1756737246082';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tributes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'authorName', type: 'varchar' },
                    { name: 'content', type: 'text' },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['memory', 'condolence', 'note'], // make sure these match USER_TRIBUTE_TYPES
                    },
                    { name: 'imageUrl', type: 'varchar', isNullable: true },
                    { name: 'imageId', type: 'varchar', isNullable: true },
                    { name: 'memorialId', type: 'uuid' },
                    { name: 'userId', type: 'varchar', isNullable: true },
                    { name: 'createdAt', type: 'timestamp', default: 'now()' },
                    { name: 'updatedAt', type: 'timestamp', default: 'now()' },
                ],
                foreignKeys: [
                    {
                        columnNames: ['memorialId'],
                        referencedTableName: 'memorials',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tributes');
    }
}

