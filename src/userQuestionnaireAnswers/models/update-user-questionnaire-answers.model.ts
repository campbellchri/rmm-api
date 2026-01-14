import { IPublic } from '../../common/utils/public.type';
import { UpdateUserQuestionnaireAnswerRequestDto } from '../dtos/request/update-user-questionnaire-answers-request.dto';


export class UpdateUserQuestionnaireAnswerModel {
    static fromDto(
        dto: UpdateUserQuestionnaireAnswerRequestDto,
        id: string,
    ): IPublic<UpdateUserQuestionnaireAnswerModel> {
        return {
            id,
            userId: dto.userId,
            questionnaireId: dto.questionnaireId,
            answerId: dto.answerId,
        };
    }

    id: string;
    userId?: string;
    questionnaireId?: string;
    answerId?: string;
}
