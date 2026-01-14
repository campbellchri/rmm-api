import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { TemplateRepository } from 'src/common/database/templates/repositories/templates.repository';
import { CreateTemplateModel } from '../models/create-template-model';
import { UpdateTemplateModel } from '../models/update-template-model';
import { TemplateReadModel } from '../models/read-template-model';


@Injectable()
export class TemplateService {
    constructor(
        private readonly templateRepository: TemplateRepository,
    ) { }

    /** ✅ Create Template */
    async createTemplate(model: CreateTemplateModel): Promise<{ id: string }> {
        try {
            const template = await this.templateRepository.create(model);
            return { id: template.id };
        } catch (error) {
            console.error('Error creating template:', error);
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to create template', {
                cause: new Error(`Error creating template: ${error?.message}`),
            });
        }
    }

    /** ✅ Update Template */
    async updateTemplate(model: UpdateTemplateModel): Promise<{ id: string }> {
        try {
            const existing = await this.templateRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Template not found');
            }

            return await this.templateRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update template', {
                cause: new Error(`Updating template failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Template by ID */
    async getTemplateById(id: string): Promise<TemplateReadModel> {
        try {
            const template = await this.templateRepository.getById(id);
            if (!template) throw new NotFoundException('Template not found');
            return template;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get template', {
                cause: new Error(`Getting template failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Templates */
    async getAllTemplates(): Promise<TemplateReadModel[]> {
        try {
            return await this.templateRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch templates', {
                cause: new Error(`Fetching templates failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Templates by LandingModeId */
    async getTemplatesByLandingModeId(landingModeId: string): Promise<TemplateReadModel[]> {
        try {
            return await this.templateRepository.getByLandingModeId(landingModeId);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch templates by landing mode', {
                cause: new Error(`Fetching templates by landing mode failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Template */
    async deleteTemplate(id: string): Promise<{ id: string }> {
        try {
            return await this.templateRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete template', {
                cause: new Error(`Deleting template failed: ${error?.message}`),
            });
        }
    }
}
