import { PartialType } from '@nestjs/swagger';
import { CreateUserAnswerRequestDto } from './create-user-answers-request.dto';

export class UpdateUserAnswerRequestDto extends PartialType(
    CreateUserAnswerRequestDto,
) { }
