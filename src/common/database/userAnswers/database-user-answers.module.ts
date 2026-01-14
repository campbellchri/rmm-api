import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { UserAnswersRepository } from './repositories/user-answers.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [UserAnswersRepository],
    exports: [UserAnswersRepository],
})
export class DatabaseUserAnswersModule { }
