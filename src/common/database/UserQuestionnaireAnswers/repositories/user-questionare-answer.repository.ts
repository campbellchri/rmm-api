import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { UserQuestionnaireAnswersEntity } from '../entities/user-questionnare-answer.entity';
import { CreateUserQuestionnaireAnswerModel } from 'src/userQuestionnaireAnswers/models/create-user-questionnaire-answers.model';
import { UserEntity } from '../../user/entities/user.entity';
import { UserQuestionnaireEntity } from '../../userQuestionnaire/entities/user-questionnaire.entity';
import { UserAnswersEntity } from '../../userAnswers/entities/user-answers.entity';
import { UserQuestionnaireAnswerReadModel } from 'src/userQuestionnaireAnswers/models/read-user-questionnaire-answers.model';
import { UpdateUserQuestionnaireAnswerModel } from 'src/userQuestionnaireAnswers/models/update-user-questionnaire-answers.model';


@Injectable()
export class UserQuestionnaireAnswerRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<UserQuestionnaireAnswersEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireAnswersEntity>(
            UserQuestionnaireAnswersEntity,
        );

        if (!id) {
            throw new InternalServerErrorException('Answer ID is required');
        }
        const answer = await repository.findOne({ where: { id } });

        if (!answer) {
            throw new NotFoundException(`Answer with ID ${id} not found`);
        }

        return answer;
    }

    /** ✅ Create */
    async create(
        model: CreateUserQuestionnaireAnswerModel,
        options?: IQueryOptions,
    ): Promise<UserQuestionnaireAnswersEntity> {
        const { entityManager } = this.parseOptions(options);

        const answersRepository = entityManager.getRepository(UserQuestionnaireAnswersEntity);
        const userRepo = entityManager.getRepository(UserEntity);
        const questionnaireRepo = entityManager.getRepository(UserQuestionnaireEntity);
        const userAnswerRepo = entityManager.getRepository(UserAnswersEntity);

        try {
            const user = await userRepo.findOne({ where: { id: model.userId } });
            if (!user) throw new NotFoundException(`User ${model.userId} not found`);

            const questionnaire = await questionnaireRepo.findOne({ where: { id: model.questionnaireId } });
            if (!questionnaire) throw new NotFoundException(`Questionnaire ${model.questionnaireId} not found`);

            const answer = await userAnswerRepo.findOne({ where: { id: model.answerId } });
            if (!answer) throw new NotFoundException(`Answer ${model.answerId} not found`);

            const entity = new UserQuestionnaireAnswersEntity();
            entity.user = user;
            entity.questionnaire = questionnaire;
            entity.answer = answer;

            return await answersRepository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating questionnaire answer failed', {
                cause: new Error(error?.message),
            });
        }
    }


    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<UserQuestionnaireAnswerReadModel> {
        const answer = await this._getById(id, options);
        return UserQuestionnaireAnswerReadModel.fromEntity(answer);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<UserQuestionnaireAnswerReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireAnswersEntity>(
            UserQuestionnaireAnswersEntity,
        );

        const answers = await repository.find();
        return UserQuestionnaireAnswerReadModel.fromEntities(answers);
    }

    /** ✅ Update */
    async update(
        model: UpdateUserQuestionnaireAnswerModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository(UserQuestionnaireAnswersEntity);
        const userAnswerRepo = entityManager.getRepository(UserAnswersEntity);
        const questionnaireRepo = entityManager.getRepository(UserQuestionnaireEntity);

        try {
            const answerEntity = await repository.findOne({ where: { id: model.id } });
            if (!answerEntity) {
                throw new NotFoundException('Answer not found');
            }

            // ✅ update answer relation
            if (model.answerId) {
                const newAnswer = await userAnswerRepo.findOne({ where: { id: model.answerId } });
                if (!newAnswer) {
                    throw new NotFoundException(`UserAnswer with ID ${model.answerId} not found`);
                }
                answerEntity.answer = newAnswer;
            }

            // ✅ update questionnaire relation
            if (model.questionnaireId) {
                const newQuestionnaire = await questionnaireRepo.findOne({ where: { id: model.questionnaireId } });
                if (!newQuestionnaire) {
                    throw new NotFoundException(`Questionnaire with ID ${model.questionnaireId} not found`);
                }
                answerEntity.questionnaire = newQuestionnaire;
            }

            const updated = await repository.save(answerEntity);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating questionnaire answer failed', {
                cause: new Error(error?.message),
            });
        }
    }


    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireAnswersEntity>(UserQuestionnaireAnswersEntity);

        try {
            const answer = await repository.findOne({ where: { id } });
            if (!answer) {
                throw new NotFoundException('Answer not found');
            }

            await repository.remove(answer);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting answer failed', {
                cause: new Error(error?.message),
            });
        }
    }
}
