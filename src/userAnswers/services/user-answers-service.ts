import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UserAnswersRepository } from 'src/common/database/userAnswers/repositories/user-answers.repository';
import { CreateAnswerModel } from '../models/create-user-answers.model';
import { UpdateAnswerModel } from '../models/update-user-answers.model';
import { UserAnswerReadModel } from '../models/read-user-answers.model';


@Injectable()
export class UserAnswersService {
    constructor(private readonly userAnswersRepository: UserAnswersRepository) { }

    /** ✅ Create Answer */
    async createAnswer(model: CreateAnswerModel): Promise<{ id: string }> {
        try {
            const answer = await this.userAnswersRepository.create(model);
            return { id: answer.id };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to create answer', {
                cause: new Error(`Error creating answer: ${error?.message}`),
            });
        }
    }

    /** ✅ Update Answer */
    async updateAnswer(model: UpdateAnswerModel): Promise<{ id: string }> {
        try {
            const existing = await this.userAnswersRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Answer not found');
            }

            return await this.userAnswersRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update answer', {
                cause: new Error(`Updating answer failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Answer by ID */
    async getAnswerById(id: string): Promise<UserAnswerReadModel> {
        try {
            const answer = await this.userAnswersRepository.getById(id);
            if (!answer) throw new NotFoundException('Answer not found');
            return answer;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get answer', {
                cause: new Error(`Getting answer failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Answers */
    async getAllAnswers(): Promise<UserAnswerReadModel[]> {
        try {
            return await this.userAnswersRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch answers', {
                cause: new Error(`Fetching answers failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Answer */
    async deleteAnswer(id: string): Promise<{ id: string }> {
        try {
            return await this.userAnswersRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete answer', {
                cause: new Error(`Deleting answer failed: ${error?.message}`),
            });
        }
    }
}
