import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserQuestionnaireTable1757421077095 implements MigrationInterface {
    name?: "CreateUserQuestionnaireTable1757421077095";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'userQuestionnaire',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: 'gen_random_uuid()',
                },
                { name: 'title', type: 'varchar' },
                { name: 'questionnaire', type: 'varchar' },
                { name: 'iconURL', type: 'varchar', isNullable: true },
                { name: 'iconId', type: 'varchar', isNullable: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('userQuestionnaire');
    }

}
