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
import { FaqItemEntity } from '../entities/faq-item.entity';
import { CreateFaqItemModel } from 'src/faq/models/create-faq-item-model';
import { UpdateFaqItemModel } from 'src/faq/models/update-faq-item-model';
import { FaqItemReadModel } from 'src/faq/models/read-faq-item-model';

@Injectable()
export class FaqItemRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create FAQ Item */
    async create(
        model: CreateFaqItemModel,
        options?: IQueryOptions,
    ): Promise<FaqItemEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqItemEntity>(FaqItemEntity);

        try {
            // Verify category exists
            const categoryRepo = entityManager.getRepository('FaqCategoryEntity');
            const category = await categoryRepo.findOne({ where: { id: model.categoryId } });
            if (!category) {
                throw new NotFoundException(`FAQ category with ID ${model.categoryId} not found`);
            }

            const entity = new FaqItemEntity();
            entity.question = model.question;
            entity.answer = model.answer;
            entity.categoryId = model.categoryId;
            entity.order = model.order ?? 0;

            return await repository.save(entity);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Creating FAQ item failed', {
                cause: new Error(`Error creating FAQ item: ${error?.message}`),
            });
        }
    }

    /** ✅ Get FAQ Item by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<FaqItemEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqItemEntity>(FaqItemEntity);

        const entity = await repository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (!entity) {
            throw new NotFoundException(`FAQ item with ID ${id} not found`);
        }

        return entity;
    }

    /** ✅ Get All FAQ Items */
    async getAll(options?: IQueryOptions): Promise<FaqItemEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqItemEntity>(FaqItemEntity);

        return await repository.find({
            relations: ['category'],
            order: { order: 'ASC' },
        });
    }

    /** ✅ Get FAQ Items by Category ID */
    async getByCategoryId(
        categoryId: string,
        options?: IQueryOptions,
    ): Promise<FaqItemEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqItemEntity>(FaqItemEntity);

        return await repository.find({
            where: { categoryId },
            relations: ['category'],
            order: { order: 'ASC' },
        });
    }

    /** ✅ Update FAQ Item */
    async update(
        model: UpdateFaqItemModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqItemEntity>(FaqItemEntity);

        try {
            const entity = await repository.findOne({ where: { id: model.id } });
            if (!entity) {
                throw new NotFoundException(`FAQ item with ID ${model.id} not found`);
            }

            if (model.question !== undefined) entity.question = model.question;
            if (model.answer !== undefined) entity.answer = model.answer;
            if (model.categoryId !== undefined) {
                // Verify category exists
                const categoryRepo = entityManager.getRepository('FaqCategoryEntity');
                const category = await categoryRepo.findOne({ where: { id: model.categoryId } });
                if (!category) {
                    throw new NotFoundException(`FAQ category with ID ${model.categoryId} not found`);
                }
                entity.categoryId = model.categoryId;
            }
            if (model.order !== undefined) entity.order = model.order;

            await repository.save(entity);
            return { id: entity.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Updating FAQ item failed', {
                cause: new Error(`Error updating FAQ item: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete FAQ Item */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<FaqItemEntity>(FaqItemEntity);

        try {
            const entity = await repository.findOne({ where: { id } });
            if (!entity) {
                throw new NotFoundException(`FAQ item with ID ${id} not found`);
            }

            await repository.remove(entity);
            return { id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Deleting FAQ item failed', {
                cause: new Error(`Error deleting FAQ item: ${error?.message}`),
            });
        }
    }
}
