import { PartialType } from '@nestjs/swagger';
import { CreateUserQuestionnaireAnswerRequestDto } from './create-user-questionnaire-answers-request.dto';


export class UpdateUserQuestionnaireAnswerRequestDto extends PartialType(
    CreateUserQuestionnaireAnswerRequestDto,
) { }
