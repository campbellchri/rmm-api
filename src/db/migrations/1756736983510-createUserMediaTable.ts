import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserMediaTable1756736983510 implements MigrationInterface {
    name = 'CreateUserMediaTable1756736983510';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_media',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'mimeType', type: 'varchar' },
                    { name: 'fileURL', type: 'varchar' },
                    { name: 'fileId', type: 'varchar', isNullable: true },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['photo', 'video', 'audio', 'document'], // make sure these match MEDIA_TYPES
                    },
                    { name: 'memorialId', type: 'uuid' },
                    { name: 'userId', type: 'varchar' },
                    { name: 'photoCaption', type: 'text', isNullable: true },
                    { name: 'photoDescription', type: 'text', isNullable: true },
                    { name: 'videoTitle', type: 'text', isNullable: true },
                    { name: 'isMainVideo', type: 'boolean', default: false },
                    { name: 'isActive', type: 'boolean', default: true },
                    { name: 'sortOrder', type: 'int', default: 0 },
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
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_media');
    }
}

