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



import { UserEntity } from '../../user/entities/user.entity';
import { LandingModeEntity } from '../../landingMode/entities/landing-mode.entity';
import { TemplateEntity } from '../../templates/entities/templates.entity';
import { MemorialEntity } from '../entities/memeorial.entity';
import { CreateMemorialModel } from 'src/memorials/models/create-memorial-model';
import { MemorialReadModel } from 'src/memorials/models/read-memorial-model';
import { UpdateMemorialModel } from 'src/memorials/models/update-memorial-model';

@Injectable()
export class MemorialRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** 🔹 Private helper */
    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<MemorialEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialEntity>(MemorialEntity);

        if (!id) {
            throw new InternalServerErrorException('Memorial ID is required');
        }

        const memorial = await repository.findOne({
            where: { id },
            relations: ['creator', 'landingMode', 'template', 'media', 'tributes', 'sayings', 'qrCodes'],
        });

        if (!memorial) {
            throw new NotFoundException(`Memorial with ID ${id} not found`);
        }

        return memorial;
    }

    /** ✅ Create Memorial */
    async create(
        model: CreateMemorialModel,
        options?: IQueryOptions,
    ): Promise<MemorialEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialEntity>(MemorialEntity);

        const userRepo = entityManager.getRepository(UserEntity);
        const landingModeRepo = entityManager.getRepository(LandingModeEntity);
        const templateRepo = entityManager.getRepository(TemplateEntity);

        // validate relations
        const creator = await userRepo.findOne({ where: { id: model.creatorId } });
        if (!creator) throw new NotFoundException(`Creator not found`);

        const landingMode = await landingModeRepo.findOne({
            where: { id: model.landingModeId },
        });
        if (!landingMode) throw new NotFoundException(`LandingMode not found`);

        const template = await templateRepo.findOne({
            where: { id: model.templateId },
        });
        if (!template) throw new NotFoundException(`Template not found`);

        try {
            const entity = new MemorialEntity();
            entity.description = model.description;
            entity.favSaying = model.favSaying;
            entity.creatorId = model.creatorId;
            entity.landingModeId = model.landingModeId;
            entity.templateId = model.templateId;
            entity.personName = model.personName;
            entity.personGender = model.personGender as any;
            entity.personBirthDate = model.personBirthDate;
            entity.personDeathDate = model.personDeathDate;
            entity.personProfilePicture = model.personProfilePicture;
            entity.profilePictureId = model.profilePictureId;
            entity.favQuote = model.favQuote;
            entity.featuredPhotoId = model.featuredPhotoId;
            entity.featuredPhotoURL = model.featuredPhotoURL;
            entity.lifeStoryText = model.lifeStoryText;
            entity.lifeStoryImageId = model.lifeStoryImageId;
            entity.lifeStoryImageURL = model.lifeStoryImageURL;
            entity.publishStatus = (model.publishStatus as any) || 'draft';
            entity.eventStart = model.eventStart;
            entity.eventDuration = model.eventDuration;
            entity.autoRevertToFullMode = model.autoRevertToFullMode ?? false;
            entity.pageURL = model.pageURL;
            // entity.slug = model.slug;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating memorial failed', {
                cause: new Error(`Error creating memorial: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Memorial by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<MemorialReadModel> {
        const memorial = await this._getById(id, options);
        return MemorialReadModel.fromEntity(memorial);
    }

    /** ✅ Get All Memorials */
    async getAll(options?: IQueryOptions): Promise<MemorialReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialEntity>(MemorialEntity);

        const memorials = await repository.find({
            relations: ['creator', 'landingMode', 'template', 'media', 'tributes', 'sayings', 'qrCodes'],
        });

        return MemorialReadModel.fromEntities(memorials);
    }

    /** ✅ Get Memorials by CreatorId */
    async getByCreatorId(
        creatorId: string,
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<MemorialReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialEntity>(MemorialEntity);

        try {
            const memorials = await repository.find({
                where: { creatorId, id: memorialId },
                relations: ['creator', 'landingMode', 'template', 'media', 'tributes', 'sayings', 'qrCodes'],
            });



            if (!memorials.length) {
                throw new NotFoundException(
                    `No memorials found`,
                );
            }

            return MemorialReadModel.fromEntities(memorials);
        } catch (error) {
            throw new InternalServerErrorException('Fetching memorials failed', {
                cause: new Error(
                    `Fetching memorials by creatorId failed: ${error?.message}`,
                ),
            });
        }
    }


    /** ✅ Update Memorial */
    async update(
        model: UpdateMemorialModel,
        options?: IQueryOptions,
      ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialEntity>(MemorialEntity);
      
        try {
          const memorial = await repository.findOne({ where: { id: model.id } });
          if (!memorial) {
            throw new NotFoundException('Memorial not found');
          }
      
          // Basic
          memorial.favSaying = model.favSaying ?? memorial.favSaying;
          memorial.description = model.description ?? memorial.description;
          memorial.favQuote = model.favQuote ?? memorial.favQuote;
      
          // Landing / Template
          memorial.landingModeId = model.landingModeId ?? memorial.landingModeId;
          memorial.templateId = model.templateId ?? memorial.templateId;
      
          // Person Details
          memorial.personName = model.personName ?? memorial.personName;
          memorial.personGender = model.personGender ?? memorial.personGender;
          memorial.personBirthDate = model.personBirthDate ?? memorial.personBirthDate;
          memorial.personDeathDate = model.personDeathDate ?? memorial.personDeathDate;
          memorial.personProfilePicture =
            model.personProfilePicture ?? memorial.personProfilePicture;
          memorial.profilePictureId =
            model.profilePictureId ?? memorial.profilePictureId;
      
          // Featured Photo
          memorial.featuredPhotoId =
            model.featuredPhotoId ?? memorial.featuredPhotoId;
          memorial.featuredPhotoURL =
            model.featuredPhotoURL ?? memorial.featuredPhotoURL;
      
          // Life Story
          memorial.lifeStoryText =
            model.lifeStoryText ?? memorial.lifeStoryText;
          memorial.lifeStoryImageId =
            model.lifeStoryImageId ?? memorial.lifeStoryImageId;
          memorial.lifeStoryImageURL =
            model.lifeStoryImageURL ?? memorial.lifeStoryImageURL;
      
          // Publishing
          memorial.publishStatus =
            model.publishStatus ?? memorial.publishStatus;
          memorial.slug = model.slug ?? memorial.slug;
          memorial.pageURL = model.pageURL ?? memorial.pageURL;
      
          // Event
          memorial.eventStart = model.eventStart ?? memorial.eventStart;
          memorial.eventDuration =
            model.eventDuration ?? memorial.eventDuration;
          memorial.autoRevertToFullMode =
            model.autoRevertToFullMode ?? memorial.autoRevertToFullMode;
      
          const updated = await repository.save(memorial);
          return { id: updated.id };
        } catch (error) {
          console.error(error, 'error in updating memorial');
      
          throw new InternalServerErrorException('Updating memorial failed', {
            cause: new Error(`Updating memorial failed: ${error?.message}`),
          });
        }
      }
      

    /** ✅ Delete Memorial */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialEntity>(MemorialEntity);

        try {
            const memorial = await repository.findOne({ where: { id } });
            if (!memorial) throw new NotFoundException('Memorial not found');

            await repository.remove(memorial);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting memorial failed', {
                cause: new Error(`Deleting memorial failed: ${error?.message}`),
            });
        }
    }
}
