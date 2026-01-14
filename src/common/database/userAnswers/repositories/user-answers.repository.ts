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
import { UserAnswersEntity } from '../entities/user-answers.entity';
import { CreateAnswerModel } from 'src/userAnswers/models/create-user-answers.model';
import { UserAnswerReadModel } from 'src/userAnswers/models/read-user-answers.model';
import { UpdateAnswerModel } from 'src/userAnswers/models/update-user-answers.model';


@Injectable()
export class UserAnswersRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<UserAnswersEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserAnswersEntity>(UserAnswersEntity);

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
        model: CreateAnswerModel,
        options?: IQueryOptions,
    ): Promise<UserAnswersEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserAnswersEntity>(UserAnswersEntity);

        try {
            const entity = new UserAnswersEntity();
            entity.answer = model.answer;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating answer failed', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<UserAnswerReadModel> {
        const answer = await this._getById(id, options);
        return UserAnswerReadModel.fromEntity(answer);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<UserAnswerReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserAnswersEntity>(UserAnswersEntity);

        const answers = await repository.find();
        return UserAnswerReadModel.fromEntities(answers);
    }

    /** ✅ Update */
    async update(
        model: UpdateAnswerModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserAnswersEntity>(UserAnswersEntity);

        try {
            const answer = await repository.findOne({ where: { id: model.id } });
            if (!answer) {
                throw new NotFoundException('Answer not found');
            }

            answer.answer = model.answer ?? answer.answer;

            const updated = await repository.save(answer);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating answer failed', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserAnswersEntity>(UserAnswersEntity);

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
