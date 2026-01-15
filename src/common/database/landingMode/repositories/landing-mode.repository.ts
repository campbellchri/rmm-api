import * as util from 'node:util';
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
import { LandingModeEntity } from '../entities/landing-mode.entity';
import { CreateLandingModeModel } from 'src/landingMode/models/create-landing-mode.model';
import { LandingModeReadModel } from 'src/landingMode/models/read-landing-mode.model';
import { UpdateLandingModeModel } from 'src/landingMode/models/update-landing-mode.model';
import { LANDING_MODES_TYPES } from 'src/landingMode/enums/landing-mode.enum';


@Injectable()
export class LandingModeRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    private async _getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<LandingModeEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LandingModeEntity>(LandingModeEntity);

        if (!id) {
            throw new InternalServerErrorException('LandingMode ID is required');
        }
        const landingMode = await repository.findOne({ where: { id } });

        if (!landingMode) {
            throw new NotFoundException(`LandingMode with ID ${id} not found`);
        }

        return landingMode;
    }

    /** ✅ Create LandingMode */
    async create(
        model: CreateLandingModeModel,
        options?: IQueryOptions,
    ): Promise<LandingModeEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LandingModeEntity>(LandingModeEntity);

        try {
            const entity = new LandingModeEntity();
            entity.title = model.title;
            entity.description = model.description;
            entity.iconId = model.iconId;
            entity.iconURL = model.iconURL;
            entity.isActive = model.isActive ?? true;
            entity.landingModeType = model.landingModeType ?? LANDING_MODES_TYPES.FULL_MODE;

            const result = await repository.save(entity);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Creating landing mode failed', {
                cause: new Error(`Error creating landing mode: ${error?.message}`),
            });
        }
    }


    /** ✅ Read by ID */
    async getById(id: string, options?: IQueryOptions): Promise<LandingModeReadModel> {
        const landingMode = await this._getById(id, options);
        return LandingModeReadModel.fromEntity(landingMode);
    }

    /** ✅ Read all */
    async getAll(options?: IQueryOptions): Promise<LandingModeReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LandingModeEntity>(LandingModeEntity);

        const landingModes = await repository.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
        return LandingModeReadModel.fromEntities(landingModes);
    }

    /** ✅ Update */
    async update(
        model: UpdateLandingModeModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LandingModeEntity>(LandingModeEntity);

        try {
            const landingMode = await repository.findOne({ where: { id: model.id } });
            if (!landingMode) {
                throw new NotFoundException('LandingMode not found');
            }

            landingMode.title = model.title ?? landingMode.title;
            landingMode.description = model.description ?? landingMode.description;
            landingMode.iconId = model.iconId ?? landingMode.iconId;
            landingMode.iconURL = model.iconURL ?? landingMode.iconURL;
            landingMode.isActive = model.isActive ?? landingMode.isActive;
            landingMode.landingModeType = model.landingModeType ?? landingMode.landingModeType;

            const updated = await repository.save(landingMode);
            return { id: updated.id };
        } catch (error) {
            throw new InternalServerErrorException('Updating LandingMode failed', {
                cause: new Error(`Updating LandingMode failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LandingModeEntity>(LandingModeEntity);

        try {
            const landingMode = await repository.findOne({ where: { id } });
            if (!landingMode) {
                throw new NotFoundException('LandingMode not found');
            }

            await repository.remove(landingMode);
            return { id };
        } catch (error) {
            throw new InternalServerErrorException('Deleting LandingMode failed', {
                cause: new Error(`Deleting LandingMode failed: ${error?.message}`),
            });
        }
    }
}