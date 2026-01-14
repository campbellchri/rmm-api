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
import { UserFeaturedMemorialEntity } from '../entities/user-featured-memorial.entity';
import { FeatureMemorialModel } from 'src/userFeaturedMemorials/models/feature-memorial-model';
import { UserFeaturedMemorialReadModel } from 'src/userFeaturedMemorials/models/read-user-featured-memorial-model';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class UserFeaturedMemorialRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Feature Memorial */
    async featureMemorial(
        model: FeatureMemorialModel,
        options?: IQueryOptions,
    ): Promise<UserFeaturedMemorialEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserFeaturedMemorialEntity>(UserFeaturedMemorialEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);
        const userRepository = entityManager.getRepository(UserEntity);

        // Validate memorial exists
        const memorial = await memorialRepository.findOne({
            where: { id: model.memorialId },
        });
        if (!memorial) {
            throw new NotFoundException(`Memorial not found`);
        }

        // Validate user exists
        const user = await userRepository.findOne({
            where: { id: model.userId },
        });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        // Check if already featured
        const existing = await repository.findOne({
            where: {
                userId: model.userId,
                memorialId: model.memorialId,
            },
        });

        if (existing) {
            // If record exists but isFeature is false, update it to true
            if (existing.isFeature === false) {
                existing.isFeature = true;
                return await repository.save(existing);
            }
            throw new BadRequestException('Memorial is already featured by this user');
        }

        try {
            const entity = new UserFeaturedMemorialEntity();
            entity.userId = model.userId;
            entity.memorialId = model.memorialId;
            entity.isFeature = true;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Featuring memorial failed', {
                cause: new Error(`Error featuring memorial: ${error?.message}`),
            });
        }
    }

    /** ✅ Unfeature Memorial */
    async unfeatureMemorial(
        userId: string,
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserFeaturedMemorialEntity>(UserFeaturedMemorialEntity);

        try {
            const featured = await repository.findOne({
                where: { userId, memorialId },
            });

            if (!featured) {
                throw new NotFoundException('Featured memorial not found');
            }

            // Set isFeature to false instead of deleting
            featured.isFeature = false;
            await repository.save(featured);
            return { id: featured.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Unfeaturing memorial failed', {
                cause: new Error(`Error unfeaturing memorial: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Featured Memorials by User */
    async getFeaturedMemorialsByUser(
        userId: string,
        options?: IQueryOptions,
    ): Promise<UserFeaturedMemorialReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserFeaturedMemorialEntity>(UserFeaturedMemorialEntity);

        const featuredMemorials = await repository.find({
            where: { userId, isFeature: true }, // Only get featured memorials (isFeature = true)
            relations: ['memorial', 'memorial.landingMode', 'memorial.template', 'memorial.media', 'memorial.tributes', 'memorial.sayings', 'memorial.qrCodes'],
            order: { createdAt: 'DESC' },
        });

        return UserFeaturedMemorialReadModel.fromEntities(featuredMemorials);
    }

    /** ✅ Check if Memorial is Featured by User */
    async isFeaturedByUser(
        userId: string,
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<boolean> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserFeaturedMemorialEntity>(UserFeaturedMemorialEntity);

        const featured = await repository.findOne({
            where: { userId, memorialId, isFeature: true }, // Only check if isFeature is true
        });

        return !!featured;
    }

    /** ✅ Get Featured Memorial by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<UserFeaturedMemorialReadModel> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserFeaturedMemorialEntity>(UserFeaturedMemorialEntity);

        if (!id) {
            throw new BadRequestException('Featured memorial ID is required');
        }

        const featured = await repository.findOne({
            where: { id },
            relations: ['memorial', 'memorial.landingMode', 'memorial.template', 'memorial.media', 'memorial.tributes', 'memorial.sayings', 'memorial.qrCodes'],
        });

        if (!featured) {
            throw new NotFoundException(`Featured memorial with ID ${id} not found`);
        }

        return UserFeaturedMemorialReadModel.fromEntity(featured);
    }
}
