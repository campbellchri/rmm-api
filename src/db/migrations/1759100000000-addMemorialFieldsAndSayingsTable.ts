import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class AddMemorialFieldsAndSayingsTable1759100000000 implements MigrationInterface {
    name = 'AddMemorialFieldsAndSayingsTable1759100000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create gender enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create publish_status enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE publish_status_enum AS ENUM ('draft', 'standard', 'private', 'archived');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create media_category enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE media_category_enum AS ENUM ('profile', 'featured', 'gallery', 'life_story_image');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Add new columns to memorials table
        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'description',
                type: 'text',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'personGender',
                type: 'enum',
                enumName: 'gender_enum',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'featuredPhotoId',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'featuredPhotoURL',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'lifeStoryText',
                type: 'text',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'lifeStoryImageId',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'lifeStoryImageURL',
                type: 'varchar',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'memorials',
            new TableColumn({
                name: 'publishStatus',
                type: 'enum',
                enumName: 'publish_status_enum',
                default: "'draft'",
            }),
        );

        // Add category and videoDescription to user_media table
        await queryRunner.addColumn(
            'user_media',
            new TableColumn({
                name: 'category',
                type: 'enum',
                enumName: 'media_category_enum',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'user_media',
            new TableColumn({
                name: 'videoDescription',
                type: 'text',
                isNullable: true,
            }),
        );

        // Create memorial_sayings table
        await queryRunner.createTable(
            new Table({
                name: 'memorial_sayings',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'authorName',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'memorialId',
                        type: 'uuid',
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
                foreignKeys: [
                    {
                        columnNames: ['memorialId'],
                        referencedTableName: 'memorials',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop memorial_sayings table
        await queryRunner.dropTable('memorial_sayings');

        // Remove columns from user_media
        await queryRunner.dropColumn('user_media', 'videoDescription');
        await queryRunner.dropColumn('user_media', 'category');

        // Remove columns from memorials
        await queryRunner.dropColumn('memorials', 'publishStatus');
        await queryRunner.dropColumn('memorials', 'lifeStoryImageURL');
        await queryRunner.dropColumn('memorials', 'lifeStoryImageId');
        await queryRunner.dropColumn('memorials', 'lifeStoryText');
        await queryRunner.dropColumn('memorials', 'featuredPhotoURL');
        await queryRunner.dropColumn('memorials', 'featuredPhotoId');
        await queryRunner.dropColumn('memorials', 'personGender');
        await queryRunner.dropColumn('memorials', 'description');

        // Drop enums
        await queryRunner.query('DROP TYPE IF EXISTS media_category_enum');
        await queryRunner.query('DROP TYPE IF EXISTS publish_status_enum');
        await queryRunner.query('DROP TYPE IF EXISTS gender_enum');
    }
}
