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
import { MemorialSayingEntity } from '../entities/memorial-sayings.entity';
import { CreateMemorialSayingModel } from 'src/memorialSayings/models/create-memorial-saying-model';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';

@Injectable()
export class MemorialSayingsRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create Saying */
    async create(
        model: CreateMemorialSayingModel,
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<MemorialSayingEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialSayingEntity>(MemorialSayingEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);

        const memorial = await memorialRepository.findOne({
            where: { id: memorialId },
        });
        if (!memorial) {
            throw new NotFoundException(`Memorial not found`);
        }

        try {
            const entity = new MemorialSayingEntity();
            entity.content = model.content;
            entity.authorName = model.authorName;
            entity.memorialId = memorialId;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating saying failed', {
                cause: new Error(`Error creating saying: ${error?.message}`),
            });
        }
    }

    /** ✅ Create Many Sayings */
    async createMany(
        models: CreateMemorialSayingModel[],
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<MemorialSayingEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialSayingEntity>(MemorialSayingEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);

        const memorial = await memorialRepository.findOne({
            where: { id: memorialId },
        });
        if (!memorial) {
            throw new NotFoundException(`Memorial not found`);
        }

        try {
            const entities = models.map((model) => {
                const entity = new MemorialSayingEntity();
                entity.content = model.content;
                entity.authorName = model.authorName;
                entity.memorialId = memorialId;
                return entity;
            });

            return await repository.save(entities);
        } catch (error) {
            throw new InternalServerErrorException('Creating sayings failed', {
                cause: new Error(`Error creating sayings: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Sayings by Memorial ID */
    async getByMemorialId(
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<MemorialSayingEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialSayingEntity>(MemorialSayingEntity);

        return await repository.find({
            where: { memorialId },
            order: {createdAt: 'DESC' },
        });
    }
}
