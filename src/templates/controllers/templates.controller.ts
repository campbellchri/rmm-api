import { Body, Controller, Param } from '@nestjs/common';
import { TemplateService } from '../services/templates.service';
import { CreateResourceCombinedDecorators, DeleteResourceCombinedDecorators, PatchResourceCombinedDecorators, ReadResourceCombinedDecorators } from 'src/common/decorators/routes-decorators.decorator';
import { CreateTemplateResponseDto } from '../dtos/response/create-template-response.dto';
import { CreateTemplateRequestDto } from '../dtos/request/create-template-request.dto';
import { CreateTemplateModel } from '../models/create-template-model';
import { UpdateTemplateResponseDto } from '../dtos/response/update-template-response.dto';
import { UpdateTemplateRequestDto } from '../dtos/request/update-template-request.dto';
import { UpdateTemplateModel } from '../models/update-template-model';
import { ReadTemplateResponseDto } from '../dtos/response/read-template-response.dto';


@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) { }

    @CreateResourceCombinedDecorators({
        responseType: CreateTemplateResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createTemplate(
        @Body() dto: CreateTemplateRequestDto,
    ): Promise<CreateTemplateResponseDto> {
        const model = CreateTemplateModel.fromDto(dto);
        const template = await this.templateService.createTemplate(model);
        return CreateTemplateResponseDto.fromModel(template);
    }

    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateTemplateResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async updateTemplate(
        @Param('id') id: string,
        @Body() dto: UpdateTemplateRequestDto,
    ): Promise<{ id: string }> {
        const model = UpdateTemplateModel.fromDto(dto, id);
        return await this.templateService.updateTemplate(model);
    }

    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadTemplateResponseDto,
        additionalErrors: ['notFound'],
    })
    async getTemplateById(
        @Param('id') id: string,
    ): Promise<ReadTemplateResponseDto> {
        const template = await this.templateService.getTemplateById(id);
        return ReadTemplateResponseDto.fromEntity(template);
    }

    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadTemplateResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAllTemplates(): Promise<ReadTemplateResponseDto[]> {
        const templates = await this.templateService.getAllTemplates();
        return ReadTemplateResponseDto.fromEntities(templates);
    }

    @ReadResourceCombinedDecorators({
        path: 'landing-mode/:landingModeId',
        responseType: ReadTemplateResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async getTemplatesByLandingModeId(
        @Param('landingModeId') landingModeId: string,
    ): Promise<ReadTemplateResponseDto[]> {
        const templates = await this.templateService.getTemplatesByLandingModeId(
            landingModeId,
        );
        return ReadTemplateResponseDto.fromEntities(templates);
    }

    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: ReadTemplateResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteTemplate(@Param('id') id: string): Promise<{ id: string }> {
        return await this.templateService.deleteTemplate(id);
    }
}
