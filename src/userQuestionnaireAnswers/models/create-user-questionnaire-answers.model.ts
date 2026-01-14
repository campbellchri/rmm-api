import { IPublic } from '../../common/utils/public.type';
import { CreateUserQuestionnaireAnswerRequestDto } from '../dtos/request/create-user-questionnaire-answers-request.dto';

export class CreateUserQuestionnaireAnswerModel {
    static fromDto(
        dto: CreateUserQuestionnaireAnswerRequestDto,
    ): IPublic<CreateUserQuestionnaireAnswerModel> {
        return {
            userId: dto.userId,
            questionnaireId: dto.questionnaireId,
            answerId: dto.answerId,
        };
    }

    userId: string;
    questionnaireId: string;
    answerId: string;
}
