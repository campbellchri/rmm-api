
import { UserQuestionnaireAnswersEntity } from 'src/common/database/UserQuestionnaireAnswers/entities/user-questionnare-answer.entity';
import { IPublic } from 'src/common/utils/public.type';

export class UserQuestionnaireAnswerReadModel {
    static fromEntity(
        entity: UserQuestionnaireAnswersEntity,
    ): IPublic<UserQuestionnaireAnswerReadModel> {
        return {
            id: entity.id,
            userId: entity.user?.id,
            questionnaireId: entity.questionnaire?.id,
            answerId: entity.answer?.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(
        entities: UserQuestionnaireAnswersEntity[],
    ): IPublic<UserQuestionnaireAnswerReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    userId: string;
    questionnaireId: string;
    answerId: string;
    createdAt: Date;
    updatedAt: Date;
}
