import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVideoOnlyModeToLandingModeEnum1759000000000 implements MigrationInterface {
    name = 'AddVideoOnlyModeToLandingModeEnum1759000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if 'video-only-mode' already exists in the enum
        const enumCheck = await queryRunner.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM pg_enum 
                WHERE enumlabel = 'video-only-mode' 
                AND enumtypid = (
                    SELECT oid 
                    FROM pg_type 
                    WHERE typname = 'landing_mode_enum'
                )
            );
        `);

        // Only add if it doesn't exist
        if (!enumCheck[0].exists) {
            await queryRunner.query(`
                ALTER TYPE landing_mode_enum ADD VALUE 'video-only-mode';
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Note: PostgreSQL doesn't support removing enum values directly
        // If you need to remove it, you would need to:
        // 1. Create a new enum without the value
        // 2. Update all columns to use the new enum
        // 3. Drop the old enum
        // For now, we'll leave it as a no-op
        // This is safe because the enum value won't cause issues if unused
    }
}
