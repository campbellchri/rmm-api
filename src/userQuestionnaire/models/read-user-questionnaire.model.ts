
import { UserQuestionnaireEntity } from 'src/common/database/userQuestionnaire/entities/user-questionnaire.entity';
import { IPublic } from 'src/common/utils/public.type';

export class UserQuestionnaireReadModel {
    static fromEntity(entity: UserQuestionnaireEntity): IPublic<UserQuestionnaireReadModel> {
        return {
            id: entity.id,
            title: entity.title,
            questionnaire: entity.questionnaire,
            iconURL: entity.iconURL,
            iconId: entity.iconId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: UserQuestionnaireEntity[]): IPublic<UserQuestionnaireReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    title: string;
    questionnaire: string;
    iconURL?: string;
    iconId?: string;
    createdAt: Date;
    updatedAt: Date;
}
