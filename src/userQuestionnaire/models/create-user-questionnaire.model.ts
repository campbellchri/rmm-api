import { IPublic } from '../../common/utils/public.type';
import { CreateUserQuestionnaireRequestDto } from '../dtos/request/create-user-questionnaire-request.dto';

export class CreateQuestionnaireModel {
    static fromDto(
        dto: CreateUserQuestionnaireRequestDto,
    ): IPublic<CreateQuestionnaireModel> {
        return {
            title: dto.title,
            questionnaire: dto.questionnaire,
            iconURL: dto.iconURL,
            iconId: dto.iconId,
        };
    }

    title: string;
    questionnaire: string;
    iconURL?: string;
    iconId?: string;
}
