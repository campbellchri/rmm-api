import { forwardRef, Module } from '@nestjs/common';
import { DatabaseUserQuestionnaireModule } from 'src/common/database/userQuestionnaire/database-user-questionnaire.module';
import { UserQuestionnaireController } from './controllers/user-questionnaire-controller';
import { UserQuestionnaireService } from './services/user-questionnaire-service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';




@Module({
    imports: [DatabaseUserQuestionnaireModule, JwtTokenModule],
    controllers: [UserQuestionnaireController],
    providers: [UserQuestionnaireService],
    exports: [UserQuestionnaireService],
})
export class UserQuestionnaireModule { }