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

import { MemorialEntity } from '../../memorials/entities/memeorial.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UserMediaEntity } from '../entities/user-media.entity';
import { CreateUserMediaModel } from 'src/userMedia/models/create-user-media-model';
import { UserMediaReadModel } from 'src/userMedia/models/read-user-media-model';
import { UpdateUserMediaModel } from 'src/userMedia/models/update-user-media-model';
import { UploadService } from 'src/common/services/uploads/uploads.service';

@Injectable()
export class UserMediaRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<UserMediaEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);

        if (!id) {
            throw new InternalServerErrorException('Media ID is required');
        }
        const media = await repository.findOne({ where: { id } });

        if (!media) {
            throw new NotFoundException(`Media with ID ${id} not found`);
        }

        return media;
    }

    /** ✅ Create Media */
    async create(
        model: CreateUserMediaModel,
        options?: IQueryOptions,
    ): Promise<UserMediaEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);
        const userRepository = entityManager.getRepository(UserEntity);

        const memorial = await memorialRepository.findOne({
            where: { id: model.memorialId },
        });
        if (!memorial) {
            throw new NotFoundException(`Memorial not found`);
        }

        const user = await userRepository.findOne({ where: { id: model.userId } });
        if (!user) {
            throw new NotFoundException(`Uploader (User) not found`);
        }

        try {
            const entity = new UserMediaEntity();
            entity.mimeType = model.mimeType;
            entity.fileURL = model.fileURL;
            entity.fileId = model.fileId;
            entity.type = model.type;
            entity.category = model.category;
            entity.memorialId = model.memorialId;
            entity.userId = model.userId;
            entity.photoCaption = model.photoCaption;
            entity.photoDescription = model.photoDescription;
            entity.videoTitle = model.videoTitle;
            entity.videoDescription = model.videoDescription;
            entity.isMainVideo = model.isMainVideo;
            entity.isActive = model.isActive;
            entity.sortOrder = model.sortOrder;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating media failed', {
                cause: new Error(`Error creating media: ${error?.message}`),
            });
        }
    }

    async createMany(
        mediaList: Partial<UserMediaEntity>[],
        options?: IQueryOptions,
    ): Promise<UserMediaEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);
        const userRepository = entityManager.getRepository(UserEntity);

        if (!mediaList || mediaList.length === 0) {
            return [];
        }

        // Validate memorial exists (check first item's memorialId)
        const firstMemorialId = mediaList[0]?.memorialId;
        if (firstMemorialId) {
            const memorial = await memorialRepository.findOne({
                where: { id: firstMemorialId },
            });
            if (!memorial) {
                throw new NotFoundException(`Memorial not found`);
            }
        }

        // Validate users exist
        const userIds = [...new Set(mediaList.map(m => m.userId).filter(Boolean))];
        if (userIds.length > 0) {
            const users = await userRepository.find({
                where: userIds.map(id => ({ id })),
            });
            if (users.length !== userIds.length) {
                const foundIds = users.map(u => u.id);
                const missingIds = userIds.filter(id => !foundIds.includes(id));
                throw new NotFoundException(`Users not found: ${missingIds.join(', ')}`);
            }
        }

        try {
            const entities = mediaList.map((model) => {
                if (!model.userId) {
                    throw new BadRequestException('userId is required for user media');
                }
                const entity = new UserMediaEntity();
                entity.mimeType = model.mimeType;
                entity.fileURL = model.fileURL;
                entity.fileId = model.fileId;
                entity.type = model.type;
                entity.category = model.category || null; // Explicitly set to null if undefined
                entity.memorialId = model.memorialId;
                entity.userId = model.userId; // Should be set by controller
                entity.photoCaption = model.photoCaption;
                entity.photoDescription = model.photoDescription;
                entity.videoTitle = model.videoTitle;
                entity.videoDescription = model.videoDescription || null; // Explicitly set to null if undefined
                entity.isMainVideo = model.isMainVideo ?? false;
                entity.isActive = model.isActive ?? true;
                entity.sortOrder = model.sortOrder ?? 0;
                return entity;
            });

            return await repository.save(entities);
        } catch (error) {
            console.error('Error creating user media in bulk:', error);
            console.error('Error details:', {
                message: error?.message,
                stack: error?.stack,
                code: error?.code,
                detail: error?.detail,
                constraint: error?.constraint,
            });
            throw new InternalServerErrorException('Failed to create user media', {
                cause: new Error(`Bulk media creation failed: ${error?.message || JSON.stringify(error)}`),
            });
        }
    }

    // async createMany(
    //     files: Express.Multer.File[],
    //     model: CreateUserMediaModel,
    //     options?: IQueryOptions,
    // ): Promise<UserMediaEntity[]> {
    //     const { entityManager } = this.parseOptions(options);
    //     const repository = entityManager.getRepository(UserMediaEntity);
    //     const memorialRepository = entityManager.getRepository(MemorialEntity);
    //     const userRepository = entityManager.getRepository(UserEntity);

    //     // Validate Memorial
    //     const memorial = await memorialRepository.findOne({
    //         where: { id: model.memorialId },
    //     });
    //     if (!memorial) {
    //         throw new NotFoundException(`Memorial not found`);
    //     }

    //     // Validate User
    //     const user = await userRepository.findOne({ where: { id: model.userId } });
    //     if (!user) {
    //         throw new NotFoundException(`Uploader (User) not found`);
    //     }

    //     try {
    //         const uploadService = new UploadService();
    //         const entities: UserMediaEntity[] = [];

    //         for (const file of files) {
    //             const { url, publicId, resourceType } = await uploadService.uploadFile(file);

    //             const entity = repository.create({
    //                 mimeType: resourceType,
    //                 fileURL: url,
    //                 fileId: publicId,
    //                 type: model.type,
    //                 memorialId: model.memorialId,
    //                 userId: model.userId,
    //                 photoCaption: model.photoCaption,
    //                 photoDescription: model.photoDescription,
    //                 videoTitle: model.videoTitle,
    //                 isMainVideo: model.isMainVideo,
    //                 isActive: model.isActive,
    //                 sortOrder: model.sortOrder,
    //             });

    //             entities.push(entity);
    //         }

    //         return await repository.save(entities);
    //     } catch (error) {
    //         throw new InternalServerErrorException('Failed to upload & create user media', {
    //             cause: new Error(`Error: ${error?.message}`),
    //         });
    //     }
    // }


    async updateMany(
        mediaList: Partial<UserMediaEntity>[],
        options?: IQueryOptions,
    ): Promise<UserMediaEntity[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository(UserMediaEntity);

        try {
            const updatedEntities: UserMediaEntity[] = [];
            for (const media of mediaList) {
                if (media.id) {
                    // Update existing
                    await repository.update(media.id, media);
                    const updated = await repository.findOneBy({ id: media.id });
                    if (updated) updatedEntities.push(updated);
                } else {
                    // Create new if no id
                    const created = repository.create(media);
                    const saved = await repository.save(created);
                    updatedEntities.push(saved);
                }
            }
            return updatedEntities;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user media', {
                cause: new Error(`Bulk update media failed: ${error?.message}`),
            });
        }
    }





    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<UserMediaReadModel> {
        const media = await this._getById(id, options);
        return UserMediaReadModel.fromEntity(media);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<UserMediaReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);

        const media = await repository.find();
        return UserMediaReadModel.fromEntities(media);
    }

    /** ✅ Read by MemorialId */
    async getByMemorialId(
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<UserMediaReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);

        try {
            const media = await repository.find({
                where: { memorialId },
            });

            if (!media.length) {
                throw new NotFoundException(
                    `No media found for Memorial ID ${memorialId}`,
                );
            }

            return UserMediaReadModel.fromEntities(media);
        } catch (error) {
            throw new InternalServerErrorException('Fetching media failed', {
                cause: new Error(
                    `Fetching media by memorialId failed: ${error?.message}`,
                ),
            });
        }
    }

    /** ✅ Read by UserId */
    async getByUserId(
        userId: string,
        options?: IQueryOptions,
    ): Promise<UserMediaReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);

        try {
            const media = await repository.find({
                where: { userId },
            });

            if (!media.length) {
                throw new NotFoundException(
                    `No media found for User ID ${userId}`,
                );
            }

            return UserMediaReadModel.fromEntities(media);
        } catch (error) {
            throw new InternalServerErrorException('Fetching media failed', {
                cause: new Error(
                    `Fetching media by memorialId failed: ${error?.message}`,
                ),
            });
        }
    }

    /** ✅ Update */
    async update(
        model: UpdateUserMediaModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);

        try {
            const media = await repository.findOne({ where: { id: model.id } });
            if (!media) {
                throw new NotFoundException('Media not found');
            }

            media.mimeType = model.mimeType ?? media.mimeType;
            media.fileURL = model.fileURL ?? media.fileURL;
            media.fileId = model.fileId ?? media.fileId;
            media.type = model.type ?? media.type;
            media.memorialId = model.memorialId ?? media.memorialId;
            media.userId = model.userId ?? media.userId;
            media.photoCaption = model.photoCaption ?? media.photoCaption;
            media.photoDescription = model.photoDescription ?? media.photoDescription;
            media.videoTitle = model.videoTitle ?? media.videoTitle;
            media.isMainVideo =
                model.isMainVideo !== undefined ? model.isMainVideo : media.isMainVideo;
            media.isActive =
                model.isActive !== undefined ? model.isActive : media.isActive;
            media.sortOrder = model.sortOrder ?? media.sortOrder;

            const updated = await repository.save(media);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating media failed', {
                cause: new Error(`Updating media failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<UserMediaEntity>(UserMediaEntity);

        try {
            const media = await repository.findOne({ where: { id } });
            if (!media) {
                throw new NotFoundException('Media not found');
            }

            await repository.remove(media);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting media failed', {
                cause: new Error(`Deleting media failed: ${error?.message}`),
            });
        }
    }
}
