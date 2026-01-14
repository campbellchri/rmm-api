import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserQuestionnaireAnswersTable1757421278821 implements MigrationInterface {
    name?: "CreateUserQuestionnaireAnswersTable1757421278821";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_questionnaire_answers',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: 'gen_random_uuid()',
                },
                { name: 'userId', type: 'varchar' },
                { name: 'questionnaireId', type: 'uuid' },
                { name: 'answerId', type: 'uuid' },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['questionnaireId'],
                    referencedTableName: 'userQuestionnaire',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['answerId'],
                    referencedTableName: 'userAnswers',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_questionnaire_answers');
    }

}
