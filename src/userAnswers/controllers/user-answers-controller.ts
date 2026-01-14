import { Body, Controller, Param } from '@nestjs/common';

import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateAnswerModel } from '../models/create-user-answers.model';
import { UpdateAnswerModel } from '../models/update-user-answers.model';
import { UserAnswersService } from '../services/user-answers-service';
import { CreateUserAnswersResponseDto } from '../dtos/response/create-user-answers-response.dto';
import { CreateUserAnswerRequestDto } from '../dtos/request/create-user-answers-request.dto';
import { UpdateUserAnswersResponseDto } from '../dtos/response/update-user-answers-response.dto';
import { UpdateUserAnswerRequestDto } from '../dtos/request/update-user-answers-request.dto';
import { ReadUserAnswerResponseDto } from '../dtos/response/read-user-answers-response.dto';


@Controller('user-answers')
export class UserAnswersController {
    constructor(private readonly userAnswersService: UserAnswersService) { }

    /** ✅ Create Answer */
    @CreateResourceCombinedDecorators({
        responseType: CreateUserAnswersResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createAnswer(
        @Body() dto: CreateUserAnswerRequestDto,
    ): Promise<CreateUserAnswersResponseDto> {
        const model = CreateAnswerModel.fromDto(dto);
        const answer = await this.userAnswersService.createAnswer(model);
        return CreateUserAnswersResponseDto.fromModel(answer);
    }

    /** ✅ Update Answer */
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateUserAnswersResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async updateAnswer(
        @Param('id') id: string,
        @Body() dto: UpdateUserAnswerRequestDto,
    ): Promise<{ id: string }> {
        const model = UpdateAnswerModel.fromDto(dto, id);
        return await this.userAnswersService.updateAnswer(model);
    }

    /** ✅ Get Answer by ID */
    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadUserAnswerResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAnswerById(@Param('id') id: string): Promise<ReadUserAnswerResponseDto> {
        const answer = await this.userAnswersService.getAnswerById(id);
        return ReadUserAnswerResponseDto.fromEntity(answer);
    }

    /** ✅ Get All Answers */
    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadUserAnswerResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAllAnswers(): Promise<ReadUserAnswerResponseDto[]> {
        const answers = await this.userAnswersService.getAllAnswers();
        return ReadUserAnswerResponseDto.fromEntities(answers);
    }

    /** ✅ Delete Answer */
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: CreateUserAnswersResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteAnswer(@Param('id') id: string): Promise<{ id: string }> {
        return await this.userAnswersService.deleteAnswer(id);
    }
}
