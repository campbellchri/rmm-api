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

import { MemorialEntity } from '../../memorials/entities/memeorial.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UserTributeEntity } from '../entities/user-tributes.entity';
import { CreateUserTributeModel } from 'src/userTributes/models/create-user-tributes-model';
import { UserTributeReadModel } from 'src/userTributes/models/read-user-tributes-model';
import { UpdateUserTributeModel } from 'src/userTributes/models/update-user-tributes-model';

@Injectable()
export class UserTributesRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<UserTributeEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);

        if (!id) {
            throw new InternalServerErrorException('Tribute ID is required');
        }

        const tribute = await repository.findOne({ where: { id } });
        if (!tribute) {
            throw new NotFoundException(`Tribute with ID ${id} not found`);
        }

        return tribute;
    }

    /** ✅ Create Tribute */
    async create(
        model: CreateUserTributeModel,
        options?: IQueryOptions,
    ): Promise<UserTributeEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);
        const userRepository = entityManager.getRepository(UserEntity);

        const memorial = await memorialRepository.findOne({
            where: { id: model.memorialId },
        });
        if (!memorial) {
            throw new NotFoundException(`Memorial not found`);
        }

        if (model.userId) {
            const user = await userRepository.findOne({ where: { id: model.userId } });
            if (!user) {
                throw new NotFoundException(`User not found`);
            }
        }

        try {
            const entity = new UserTributeEntity();
            entity.authorName = model.authorName;
            entity.content = model.content;
            entity.type = model.type;
            entity.memorialId = model.memorialId;
            entity.userId = model.userId;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating tribute failed', {
                cause: new Error(`Error creating tribute: ${error?.message}`),
            });
        }
    }

    async createMany(
        tributeList: Partial<UserTributeEntity>[],
        options?: IQueryOptions,
    ): Promise<UserTributeEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository(UserTributeEntity);

        try {
            const entities = repository.create(tributeList);
            return await repository.save(entities);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user tributes', {
                cause: new Error(`Bulk tribute creation failed: ${error?.message}`),
            });
        }
    }


    async updateMany(
        tributeList: Partial<UserTributeEntity>[],
        options?: IQueryOptions,
    ): Promise<UserTributeEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository(UserTributeEntity);

        try {
            const updatedEntities: UserTributeEntity[] = [];
            for (const tribute of tributeList) {
                if (tribute.id) {
                    // Update existing
                    await repository.update(tribute.id, tribute);
                    const updated = await repository.findOneBy({ id: tribute.id });
                    if (updated) updatedEntities.push(updated);
                } else {
                    // Create new
                    const created = repository.create(tribute);
                    const saved = await repository.save(created);
                    updatedEntities.push(saved);
                }
            }
            return updatedEntities;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user tributes', {
                cause: new Error(`Bulk update tributes failed: ${error?.message}`),
            });
        }
    }



    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<UserTributeReadModel> {
        const tribute = await this._getById(id, options);
        return UserTributeReadModel.fromEntity(tribute);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<UserTributeReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);

        const tributes = await repository.find();
        return UserTributeReadModel.fromEntities(tributes);
    }

    /** ✅ Read by MemorialId */
    async getByMemorialId(
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<UserTributeReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);

        try {
            const tributes = await repository.find({
                where: { memorialId },
            });

            if (!tributes.length) {
                throw new NotFoundException(
                    `No tributes found for Memorial ID ${memorialId}`,
                );
            }

            return UserTributeReadModel.fromEntities(tributes);
        } catch (error) {
            throw new InternalServerErrorException('Fetching tributes failed', {
                cause: new Error(
                    `Fetching tributes by memorialId failed: ${error?.message}`,
                ),
            });
        }
    }

    /** ✅ Read by UserId */
    async getByUserId(
        userId: string,
        options?: IQueryOptions,
    ): Promise<UserTributeReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);

        try {
            const tributes = await repository.find({
                where: { userId },
            });

            if (!tributes.length) {
                throw new NotFoundException(`No tributes found for User ID ${userId}`);
            }

            return UserTributeReadModel.fromEntities(tributes);
        } catch (error) {
            throw new InternalServerErrorException('Fetching tributes failed', {
                cause: new Error(
                    `Fetching tributes by userId failed: ${error?.message}`,
                ),
            });
        }
    }

    /** ✅ Update */
    async update(
        model: UpdateUserTributeModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);

        try {
            const tribute = await repository.findOne({ where: { id: model.id } });
            if (!tribute) {
                throw new NotFoundException('Tribute not found');
            }

            tribute.authorName = model.authorName ?? tribute.authorName;
            tribute.content = model.content ?? tribute.content;
            tribute.type = model.type ?? tribute.type;
            tribute.memorialId = model.memorialId ?? tribute.memorialId;
            tribute.userId = model.userId ?? tribute.userId;

            const updated = await repository.save(tribute);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating tribute failed', {
                cause: new Error(`Updating tribute failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserTributeEntity>(UserTributeEntity);

        try {
            const tribute = await repository.findOne({ where: { id } });
            if (!tribute) {
                throw new NotFoundException('Tribute not found');
            }

            await repository.remove(tribute);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting tribute failed', {
                cause: new Error(`Deleting tribute failed: ${error?.message}`),
            });
        }
    }
}
