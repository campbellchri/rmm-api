import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { UserQuestionnaireAnswerRepository } from './repositories/user-questionare-answer.repository';


@Module({
    imports: [DatabaseConnectionModule],
    providers: [UserQuestionnaireAnswerRepository],
    exports: [UserQuestionnaireAnswerRepository],
})
export class DatabaseUserQuestionnaireAnswersModule { }
