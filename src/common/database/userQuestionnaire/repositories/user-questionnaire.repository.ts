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
import { UserQuestionnaireEntity } from '../entities/user-questionnaire.entity';
import { CreateQuestionnaireModel } from 'src/userQuestionnaire/models/create-user-questionnaire.model';
import { UserQuestionnaireReadModel } from 'src/userQuestionnaire/models/read-user-questionnaire.model';
import { UpdateQuestionnaireModel } from 'src/userQuestionnaire/models/update-user-questionnaire.model';


@Injectable()
export class UserQuestionnaireRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<UserQuestionnaireEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireEntity>(UserQuestionnaireEntity);

        if (!id) {
            throw new InternalServerErrorException('Questionnaire ID is required');
        }
        const questionnaire = await repository.findOne({ where: { id } });

        if (!questionnaire) {
            throw new NotFoundException(`Questionnaire with ID ${id} not found`);
        }

        return questionnaire;
    }

    /** ✅ Create */
    async create(
        model: CreateQuestionnaireModel,
        options?: IQueryOptions,
    ): Promise<UserQuestionnaireEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireEntity>(UserQuestionnaireEntity);

        try {
            const entity = new UserQuestionnaireEntity();
            entity.title = model.title;
            entity.questionnaire = model.questionnaire;
            entity.iconURL = model.iconURL;
            entity.iconId = model.iconId;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating questionnaire failed', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<UserQuestionnaireReadModel> {
        const questionnaire = await this._getById(id, options);
        return UserQuestionnaireReadModel.fromEntity(questionnaire);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<UserQuestionnaireReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireEntity>(UserQuestionnaireEntity);

        const questionnaires = await repository.find();
        return UserQuestionnaireReadModel.fromEntities(questionnaires);
    }

    /** ✅ Update */
    async update(
        model: UpdateQuestionnaireModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireEntity>(UserQuestionnaireEntity);

        try {
            const questionnaire = await repository.findOne({ where: { id: model.id } });
            if (!questionnaire) {
                throw new NotFoundException('Questionnaire not found');
            }

            questionnaire.title = model.title ?? questionnaire.title;
            questionnaire.questionnaire = model.questionnaire ?? questionnaire.questionnaire;
            questionnaire.iconURL = model.iconURL ?? questionnaire.iconURL;
            questionnaire.iconId = model.iconId ?? questionnaire.iconId;

            const updated = await repository.save(questionnaire);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating questionnaire failed', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserQuestionnaireEntity>(UserQuestionnaireEntity);

        try {
            const questionnaire = await repository.findOne({ where: { id } });
            if (!questionnaire) {
                throw new NotFoundException('Questionnaire not found');
            }

            await repository.remove(questionnaire);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting questionnaire failed', {
                cause: new Error(error?.message),
            });
        }
    }
}
