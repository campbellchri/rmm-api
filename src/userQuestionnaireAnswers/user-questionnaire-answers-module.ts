import { forwardRef, Module } from '@nestjs/common';
import { DatabaseUserQuestionnaireAnswersModule } from 'src/common/database/UserQuestionnaireAnswers/database-user-questionnare-answer.module';
import { UserQuestionnaireAnswersController } from './controllers/user-questionnaire-answers-controller';
import { UserQuestionnaireAnswersService } from './services/user-questionnaire-answers-service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseUserQuestionnaireAnswersModule, JwtTokenModule],
    controllers: [UserQuestionnaireAnswersController],
    providers: [UserQuestionnaireAnswersService],
    exports: [UserQuestionnaireAnswersService],
})
export class UserQuestionnaireAnswersModule { }