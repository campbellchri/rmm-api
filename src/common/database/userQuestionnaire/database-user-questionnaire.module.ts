import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { UserQuestionnaireRepository } from './repositories/user-questionnaire.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [UserQuestionnaireRepository],
    exports: [UserQuestionnaireRepository],
})
export class DatabaseUserQuestionnaireModule { }
