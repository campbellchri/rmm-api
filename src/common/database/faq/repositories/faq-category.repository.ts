import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { FaqCategoryEntity } from '../entities/faq-category.entity';
import { CreateFaqCategoryModel } from 'src/faq/models/create-faq-category-model';
import { UpdateFaqCategoryModel } from 'src/faq/models/update-faq-category-model';
import { FaqCategoryReadModel } from 'src/faq/models/read-faq-category-model';

@Injectable()
export class FaqCategoryRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create FAQ Category */
    async create(
        model: CreateFaqCategoryModel,
        options?: IQueryOptions,
    ): Promise<FaqCategoryEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqCategoryEntity>(FaqCategoryEntity);

        try {
            const entity = new FaqCategoryEntity();
            entity.title = model.title;
            entity.iconURL = model.iconURL;
            entity.iconId = model.iconId;
            entity.order = model.order ?? 0;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating FAQ category failed', {
                cause: new Error(`Error creating FAQ category: ${error?.message}`),
            });
        }
    }

    /** ✅ Get FAQ Category by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<FaqCategoryEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqCategoryEntity>(FaqCategoryEntity);

        const entity = await repository.findOne({
            where: { id },
            relations: ['items'],
            order: { order: 'ASC', items: { order: 'ASC' } },
        });

        if (!entity) {
            throw new NotFoundException(`FAQ category with ID ${id} not found`);
        }

        return entity;
    }

    /** ✅ Get All FAQ Categories */
    async getAll(options?: IQueryOptions): Promise<FaqCategoryEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqCategoryEntity>(FaqCategoryEntity);

        return await repository.find({
            relations: ['items'],
            order: { order: 'ASC', items: { order: 'ASC' } },
        });
    }

    /** ✅ Update FAQ Category */
    async update(
        model: UpdateFaqCategoryModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqCategoryEntity>(FaqCategoryEntity);

        try {
            const entity = await repository.findOne({ where: { id: model.id } });
            if (!entity) {
                throw new NotFoundException(`FAQ category with ID ${model.id} not found`);
            }

            if (model.title !== undefined) entity.title = model.title;
            if (model.iconURL !== undefined) entity.iconURL = model.iconURL;
            if (model.iconId !== undefined) entity.iconId = model.iconId;
            if (model.order !== undefined) entity.order = model.order;

            await repository.save(entity);
            return { id: entity.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Updating FAQ category failed', {
                cause: new Error(`Error updating FAQ category: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete FAQ Category */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqCategoryEntity>(FaqCategoryEntity);

        try {
            const entity = await repository.findOne({ where: { id } });
            if (!entity) {
                throw new NotFoundException(`FAQ category with ID ${id} not found`);
            }

            await repository.remove(entity);
            return { id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Deleting FAQ category failed', {
                cause: new Error(`Error deleting FAQ category: ${error?.message}`),
            });
        }
    }
}
