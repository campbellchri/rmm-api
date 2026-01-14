import { PartialType } from '@nestjs/swagger';
import { CreateUserQuestionnaireRequestDto } from './create-user-questionnaire-request.dto';

export class UpdateUserQuestionnaireRequestDto extends PartialType(
    CreateUserQuestionnaireRequestDto,
) { }
