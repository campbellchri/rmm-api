
import { UserAnswersEntity } from 'src/common/database/userAnswers/entities/user-answers.entity';
import { IPublic } from 'src/common/utils/public.type';

export class UserAnswerReadModel {
    static fromEntity(entity: UserAnswersEntity): IPublic<UserAnswerReadModel> {
        return {
            id: entity.id,
            answer: entity.answer,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: UserAnswersEntity[]): IPublic<UserAnswerReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
}
