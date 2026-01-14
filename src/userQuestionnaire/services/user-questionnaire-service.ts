import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UserQuestionnaireRepository } from 'src/common/database/userQuestionnaire/repositories/user-questionnaire.repository';
import { CreateQuestionnaireModel } from '../models/create-user-questionnaire.model';
import { UpdateQuestionnaireModel } from '../models/update-user-questionnaire.model';
import { UserQuestionnaireReadModel } from '../models/read-user-questionnaire.model';


@Injectable()
export class UserQuestionnaireService {
    constructor(
        private readonly userQuestionnaireRepository: UserQuestionnaireRepository,
    ) { }

    /** ✅ Create Questionnaire */
    async createQuestionnaire(
        model: CreateQuestionnaireModel,
    ): Promise<{ id: string }> {
        try {
            const questionnaire = await this.userQuestionnaireRepository.create(model);
            return { id: questionnaire.id };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to create questionnaire', {
                cause: new Error(`Error creating questionnaire: ${error?.message}`),
            });
        }
    }

    /** ✅ Update Questionnaire */
    async updateQuestionnaire(
        model: UpdateQuestionnaireModel,
    ): Promise<{ id: string }> {
        try {
            const existing = await this.userQuestionnaireRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Questionnaire not found');
            }

            return await this.userQuestionnaireRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update questionnaire', {
                cause: new Error(`Updating questionnaire failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Questionnaire by ID */
    async getQuestionnaireById(id: string): Promise<UserQuestionnaireReadModel> {
        try {
            const questionnaire = await this.userQuestionnaireRepository.getById(id);
            if (!questionnaire) throw new NotFoundException('Questionnaire not found');
            return questionnaire;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get questionnaire', {
                cause: new Error(`Getting questionnaire failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Questionnaires */
    async getAllQuestionnaires(): Promise<UserQuestionnaireReadModel[]> {
        try {
            return await this.userQuestionnaireRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch questionnaires', {
                cause: new Error(`Fetching questionnaires failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Questionnaire */
    async deleteQuestionnaire(id: string): Promise<{ id: string }> {
        try {
            return await this.userQuestionnaireRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete questionnaire', {
                cause: new Error(`Deleting questionnaire failed: ${error?.message}`),
            });
        }
    }
}
