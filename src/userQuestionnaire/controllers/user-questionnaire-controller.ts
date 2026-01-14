import { Body, Controller, Param } from '@nestjs/common';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateQuestionnaireModel } from '../models/create-user-questionnaire.model';

import { UpdateQuestionnaireModel } from '../models/update-user-questionnaire.model';
import { UserQuestionnaireService } from '../services/user-questionnaire-service';
import { CreateUserQuestionnaireResponseDto } from '../dtos/response/create-user-questionnaire-response.dto';
import { CreateUserQuestionnaireRequestDto } from '../dtos/request/create-user-questionnaire-request.dto';
import { UpdateUserQuestionnaireResponseDto } from '../dtos/response/update-user-questionnaire-response.dto';
import { UpdateUserQuestionnaireRequestDto } from '../dtos/request/update-user-questionnaire-request.dto';
import { ReadUserQuestionnaireResponseDto } from '../dtos/response/read-user-questionnaire-response.dto';


@Controller('user-questionnaires')
export class UserQuestionnaireController {
    constructor(
        private readonly userQuestionnaireService: UserQuestionnaireService,
    ) { }

    /** ✅ Create Questionnaire */
    @CreateResourceCombinedDecorators({
        responseType: CreateUserQuestionnaireResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createQuestionnaire(
        @Body() dto: CreateUserQuestionnaireRequestDto,
    ): Promise<CreateUserQuestionnaireResponseDto> {
        const model = CreateQuestionnaireModel.fromDto(dto);
        const questionnaire =
            await this.userQuestionnaireService.createQuestionnaire(model);
        return CreateUserQuestionnaireResponseDto.fromModel(questionnaire);
    }

    /** ✅ Update Questionnaire */
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateUserQuestionnaireResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async updateQuestionnaire(
        @Param('id') id: string,
        @Body() dto: UpdateUserQuestionnaireRequestDto,
    ): Promise<{ id: string }> {
        const model = UpdateQuestionnaireModel.fromDto(dto, id);
        const questionnaire = await this.userQuestionnaireService.updateQuestionnaire(model);
        return UpdateUserQuestionnaireResponseDto.fromModel(questionnaire);
    }

    /** ✅ Get Questionnaire by ID */
    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadUserQuestionnaireResponseDto,
        additionalErrors: ['notFound'],
    })
    async getQuestionnaireById(
        @Param('id') id: string,
    ): Promise<ReadUserQuestionnaireResponseDto> {
        const questionnaire =
            await this.userQuestionnaireService.getQuestionnaireById(id);
        return ReadUserQuestionnaireResponseDto.fromEntity(questionnaire);
    }

    /** ✅ Get All Questionnaires */
    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadUserQuestionnaireResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAllQuestionnaires(): Promise<ReadUserQuestionnaireResponseDto[]> {
        const questionnaires =
            await this.userQuestionnaireService.getAllQuestionnaires();
        return ReadUserQuestionnaireResponseDto.fromEntities(questionnaires);
    }

    /** ✅ Delete Questionnaire */
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: CreateUserQuestionnaireResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteQuestionnaire(
        @Param('id') id: string,
    ): Promise<{ id: string }> {
        return await this.userQuestionnaireService.deleteQuestionnaire(id);
    }
}
