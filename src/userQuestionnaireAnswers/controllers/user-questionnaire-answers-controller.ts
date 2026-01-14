import { Body, Controller, Param } from '@nestjs/common';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateUserQuestionnaireAnswerRequestDto } from '../dtos/request/create-user-questionnaire-answers-request.dto';
import { UpdateUserQuestionnaireAnswerRequestDto } from '../dtos/request/update-user-questionnaire-answers-request.dto';
import { ReadUserQuestionnaireAnswerResponseDto } from '../dtos/response/read-user-questionnaire-answers-response.dto';
import { CreateUserQuestionnaireAnswerModel } from '../models/create-user-questionnaire-answers.model';
import { UpdateUserQuestionnaireAnswerModel } from '../models/update-user-questionnaire-answers.model';
import { UserQuestionnaireAnswersService } from '../services/user-questionnaire-answers-service';
import { CreateUserQuestionnaireAnswersResponseDto } from '../dtos/response/create-user-questionnaire-answers-response.dto';
import { UpdateUserQuestionnaireAnswersResponseDto } from '../dtos/response/update-user-questionnaire-answers-response.dto';

@Controller('user-questionnaire-answers')
export class UserQuestionnaireAnswersController {
    constructor(
        private readonly userQuestionnaireAnswersService: UserQuestionnaireAnswersService,
    ) { }

    /** ✅ Create */
    @CreateResourceCombinedDecorators({
        responseType: CreateUserQuestionnaireAnswersResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async create(
        @Body() dto: CreateUserQuestionnaireAnswerRequestDto,
    ): Promise<CreateUserQuestionnaireAnswersResponseDto> {
        const model = CreateUserQuestionnaireAnswerModel.fromDto(dto);
        const created = await this.userQuestionnaireAnswersService.create(model);
        return CreateUserQuestionnaireAnswersResponseDto.fromModel(created);
    }

    /** ✅ Update */
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateUserQuestionnaireAnswersResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateUserQuestionnaireAnswerRequestDto,
    ): Promise<{ id: string }> {
        const model = UpdateUserQuestionnaireAnswerModel.fromDto(dto, id);
        return await this.userQuestionnaireAnswersService.update(model);
    }

    /** ✅ Get by ID */
    @ReadResourceCombinedDecorators({
        path: ':id',
        responseType: ReadUserQuestionnaireAnswerResponseDto,
        additionalErrors: ['notFound'],
    })
    async getById(
        @Param('id') id: string,
    ): Promise<ReadUserQuestionnaireAnswerResponseDto> {
        const entity = await this.userQuestionnaireAnswersService.getById(id);
        return ReadUserQuestionnaireAnswerResponseDto.fromEntity(entity);
    }

    /** ✅ Get all */
    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadUserQuestionnaireAnswerResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAll(): Promise<ReadUserQuestionnaireAnswerResponseDto[]> {
        const entities = await this.userQuestionnaireAnswersService.getAll();
        return ReadUserQuestionnaireAnswerResponseDto.fromEntities(entities);
    }

    /** ✅ Delete */
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: ReadUserQuestionnaireAnswerResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async delete(@Param('id') id: string): Promise<{ id: string }> {
        return await this.userQuestionnaireAnswersService.delete(id);
    }
}
