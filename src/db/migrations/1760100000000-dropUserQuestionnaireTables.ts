import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUserQuestionnaireTables1760100000000 implements MigrationInterface {
    name = "DropUserQuestionnaireTables1760100000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key table first
        await queryRunner.dropTable('user_questionnaire_answers', true, true, true);
        
        // Then drop the referenced tables
        await queryRunner.dropTable('userAnswers', true, true, true);
        await queryRunner.dropTable('userQuestionnaire', true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate tables in reverse order if needed
        // This is a destructive migration, so down migration is optional
        // You can leave it empty or recreate the tables if needed
    }
}
