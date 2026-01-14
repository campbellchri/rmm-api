import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

import { CreateUserQuestionnaireAnswerModel } from '../models/create-user-questionnaire-answers.model';
import { UpdateUserQuestionnaireAnswerModel } from '../models/update-user-questionnaire-answers.model';

import { UserQuestionnaireAnswerRepository } from 'src/common/database/UserQuestionnaireAnswers/repositories/user-questionare-answer.repository';
import { UserQuestionnaireAnswerReadModel } from '../models/read-user-questionnaire-answers.model';

@Injectable()
export class UserQuestionnaireAnswersService {
    constructor(
        private readonly userQuestionnaireAnswersRepository: UserQuestionnaireAnswerRepository,
    ) { }

    /** ✅ Create UserQuestionnaireAnswer */
    async create(
        model: CreateUserQuestionnaireAnswerModel,
    ): Promise<{ id: string }> {
        try {
            const entity = await this.userQuestionnaireAnswersRepository.create(model);
            return { id: entity.id };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException)
                throw error;
            throw new InternalServerErrorException('Failed to create questionnaire answer', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Update UserQuestionnaireAnswer */
    async update(
        model: UpdateUserQuestionnaireAnswerModel,
    ): Promise<{ id: string }> {
        try {
            const existing = await this.userQuestionnaireAnswersRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Questionnaire answer not found');
            }

            return await this.userQuestionnaireAnswersRepository.update(model);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException)
                throw error;
            throw new InternalServerErrorException('Failed to update questionnaire answer', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Get by ID */
    async getById(id: string): Promise<UserQuestionnaireAnswerReadModel> {
        try {
            const entity = await this.userQuestionnaireAnswersRepository.getById(id);
            if (!entity) {
                throw new NotFoundException('Questionnaire answer not found');
            }
            return entity;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch questionnaire answer', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Get All */
    async getAll(): Promise<UserQuestionnaireAnswerReadModel[]> {
        try {
            return await this.userQuestionnaireAnswersRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch questionnaire answers', {
                cause: new Error(error?.message),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string): Promise<{ id: string }> {
        try {
            return await this.userQuestionnaireAnswersRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete questionnaire answer', {
                cause: new Error(error?.message),
            });
        }
    }
}
