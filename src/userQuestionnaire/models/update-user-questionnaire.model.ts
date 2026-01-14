import { IPublic } from '../../common/utils/public.type';
import { UpdateUserQuestionnaireRequestDto } from '../dtos/request/update-user-questionnaire-request.dto';


export class UpdateQuestionnaireModel {
    static fromDto(
        dto: UpdateUserQuestionnaireRequestDto,
        id: string,
    ): IPublic<UpdateQuestionnaireModel> {
        return {
            id,
            title: dto.title,
            questionnaire: dto.questionnaire,
            iconURL: dto.iconURL,
            iconId: dto.iconId,
        };
    }

    id: string;
    title?: string;
    questionnaire?: string;
    iconURL?: string;
    iconId?: string;
}
