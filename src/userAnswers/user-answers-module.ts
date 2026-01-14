import { forwardRef, Module } from '@nestjs/common';
import { DatabaseUserAnswersModule } from 'src/common/database/userAnswers/database-user-answers.module';
import { UserAnswersController } from './controllers/user-answers-controller';
import { UserAnswersService } from './services/user-answers-service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';


@Module({
    imports: [DatabaseUserAnswersModule, JwtTokenModule],
    controllers: [UserAnswersController],
    providers: [UserAnswersService],
    exports: [UserAnswersService],
})
export class UserAnswersModule { }
