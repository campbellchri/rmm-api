import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsFeatureToUserFeaturedMemorials1759400000000 implements MigrationInterface {
    name = 'AddIsFeatureToUserFeaturedMemorials1759400000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user_featured_memorials',
            new TableColumn({
                name: 'isFeature',
                type: 'boolean',
                default: true,
            }),
        );

        // Update all existing records to have isFeature = true
        await queryRunner.query(`
            UPDATE user_featured_memorials 
            SET "isFeature" = true 
            WHERE "isFeature" IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user_featured_memorials', 'isFeature');
    }
}
