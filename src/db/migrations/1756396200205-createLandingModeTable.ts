import { LANDING_MODES_TYPES } from 'src/landingMode/enums/landing-mode.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLandingModeTable1756396200205 implements MigrationInterface {
    name = 'CreateLandingModeTable1756396200205';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'landing_modes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
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
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'landingModeType',
                        type: 'enum',
                        enumName: 'landing_mode_enum', // 👈 ensures Postgres creates a proper enum type
                        enum: ['full-mode', 'event-mode', 'video-only-mode'], // 👈 must be raw strings, not TS constants
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
        await queryRunner.dropTable('landing_modes');
    }
}
