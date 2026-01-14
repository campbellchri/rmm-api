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
import { MemorialQRCodeEntity } from '../entities/memorial-qr-code.entity';
import { CreateMemorialQRCodeModel } from 'src/memorialQRCodes/models/create-memorial-qr-code-model';
import { UpdateMemorialQRCodeModel } from 'src/memorialQRCodes/models/update-memorial-qr-code-model';
import { MemorialQRCodeReadModel } from 'src/memorialQRCodes/models/read-memorial-qr-code-model';
import { MemorialEntity } from '../../memorials/entities/memeorial.entity';

@Injectable()
export class MemorialQRCodeRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create QR Code */
    async create(
        model: CreateMemorialQRCodeModel,
        options?: IQueryOptions,
    ): Promise<MemorialQRCodeEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialQRCodeEntity>(MemorialQRCodeEntity);
        const memorialRepository = entityManager.getRepository(MemorialEntity);

        const memorial = await memorialRepository.findOne({
            where: { id: model.memorialId },
        });
        if (!memorial) {
            throw new NotFoundException(`Memorial not found`);
        }

        try {
            const entity = new MemorialQRCodeEntity();
            entity.memorialId = model.memorialId;
            entity.qrCodeData = model.qrCodeData;
            entity.qrCodeImageURL = model.qrCodeImageURL;
            entity.qrCodeImageId = model.qrCodeImageId;
            entity.description = model.description;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating QR code failed', {
                cause: new Error(`Error creating QR code: ${error?.message}`),
            });
        }
    }

    /** ✅ Get QR Code by ID */
    async getById(id: string, options?: IQueryOptions): Promise<MemorialQRCodeReadModel> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialQRCodeEntity>(MemorialQRCodeEntity);

        if (!id) {
            throw new BadRequestException('QR Code ID is required');
        }

        const qrCode = await repository.findOne({
            where: { id },
            relations: ['memorial'],
        });

        if (!qrCode) {
            throw new NotFoundException(`QR Code with ID ${id} not found`);
        }

        return MemorialQRCodeReadModel.fromEntity(qrCode);
    }

    /** ✅ Get QR Code by Memorial ID */
    async getByMemorialId(
        memorialId: string,
        options?: IQueryOptions,
    ): Promise<MemorialQRCodeReadModel | null> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialQRCodeEntity>(MemorialQRCodeEntity);

        const qrCode = await repository.findOne({
            where: { memorialId },
            relations: ['memorial'],
            order: { createdAt: 'DESC' }, // Get the most recent one
        });

        return qrCode ? MemorialQRCodeReadModel.fromEntity(qrCode) : null;
    }

    /** ✅ Update QR Code */
    async update(
        model: UpdateMemorialQRCodeModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialQRCodeEntity>(MemorialQRCodeEntity);

        try {
            const qrCode = await repository.findOne({ where: { id: model.id } });
            if (!qrCode) {
                throw new NotFoundException('QR Code not found');
            }

            qrCode.qrCodeData = model.qrCodeData ?? qrCode.qrCodeData;
            qrCode.qrCodeImageURL = model.qrCodeImageURL ?? qrCode.qrCodeImageURL;
            qrCode.qrCodeImageId = model.qrCodeImageId ?? qrCode.qrCodeImageId;
            qrCode.description = model.description ?? qrCode.description;

            const updated = await repository.save(qrCode);
            return { id: updated.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Updating QR code failed', {
                cause: new Error(`Updating QR code failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete QR Code */
    async delete(id: string, options?: IQueryOptions): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<MemorialQRCodeEntity>(MemorialQRCodeEntity);

        try {
            const qrCode = await repository.findOne({ where: { id } });
            if (!qrCode) {
                throw new NotFoundException('QR Code not found');
            }

            await repository.remove(qrCode);
            return { id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Deleting QR code failed', {
                cause: new Error(`Deleting QR code failed: ${error?.message}`),
            });
        }
    }
}
