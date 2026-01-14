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
import { TemplateEntity } from '../entities/templates.entity';
import { CreateTemplateModel } from 'src/templates/models/create-template-model';
import { TemplateReadModel } from 'src/templates/models/read-template-model';
import { UpdateTemplateModel } from 'src/templates/models/update-template-model';
import { LandingModeEntity } from '../../landingMode/entities/landing-mode.entity';


@Injectable()
export class TemplateRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<TemplateEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);

        if (!id) {
            throw new InternalServerErrorException('Template ID is required');
        }
        const template = await repository.findOne({ where: { id } });

        if (!template) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return template;
    }

    /** ✅ Create Template */
    async create(
        model: CreateTemplateModel,
        options?: IQueryOptions,
    ): Promise<TemplateEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);
        const landingModeRepository = entityManager.getRepository(LandingModeEntity);

        const landingMode = await landingModeRepository.findOne({ where: { id: model.landingModeId } });
        if (!landingMode) {
            throw new NotFoundException(`LandingMode not found`);
        }

        try {
            const entity = new TemplateEntity();
            entity.name = model.name;
            entity.description = model.description;
            entity.landingModeId = model.landingModeId;
            entity.thumbnailURL = model.thumbnailURL;
            entity.thumbnailId = model.thumbnailId;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating template failed', {
                cause: new Error(`Error creating template: ${error?.message}`),
            });
        }
    }

    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<TemplateReadModel> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);
        
        const template = await repository.findOne({
            where: { id },
            relations: ['landingMode'],
        });
        
        if (!template) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }
        
        return TemplateReadModel.fromEntity(template);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<TemplateReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);

        const templates = await repository.find({
            relations: ['landingMode'],
        });
        return TemplateReadModel.fromEntities(templates);
    }

    /** ✅ Read by LandingModeId */
    async getByLandingModeId(
        landingModeId: string,
        options?: IQueryOptions,
    ): Promise<TemplateReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);

        try {
            const templates = await repository.find({
                where: { landingModeId },
                relations: ['landingMode'],
            });

            if (!templates.length) {
                throw new NotFoundException(
                    `No templates found for LandingMode ID ${landingModeId}`,
                );
            }

            return TemplateReadModel.fromEntities(templates);
        } catch (error) {
            throw new InternalServerErrorException('Fetching templates failed', {
                cause: new Error(`Fetching templates by landingModeId failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Update */
    async update(
        model: UpdateTemplateModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);

        try {
            const template = await repository.findOne({ where: { id: model.id } });
            if (!template) {
                throw new NotFoundException('Template not found');
            }

            template.name = model.name ?? template.name;
            template.description = model.description ?? template.description;
            template.landingModeId = model.landingModeId ?? template.landingModeId;
            template.thumbnailURL = model.thumbnailURL ?? template.thumbnailURL;
            template.thumbnailId = model.thumbnailId ?? template.thumbnailId;

            const updated = await repository.save(template);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating Template failed', {
                cause: new Error(`Updating Template failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<TemplateEntity>(TemplateEntity);

        try {
            const template = await repository.findOne({ where: { id } });
            if (!template) {
                throw new NotFoundException('Template not found');
            }

            await repository.remove(template);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting Template failed', {
                cause: new Error(`Deleting Template failed: ${error?.message}`),
            });
        }
    }
}
