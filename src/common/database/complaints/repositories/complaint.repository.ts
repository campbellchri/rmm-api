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
import { ComplaintEntity } from '../entities/complaint.entity';
import { CreateComplaintModel } from 'src/complaints/models/create-complaint-model';
import { ComplaintReadModel } from 'src/complaints/models/read-complaint-model';

@Injectable()
export class ComplaintRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create Complaint */
    async create(
        model: CreateComplaintModel,
        options?: IQueryOptions,
    ): Promise<ComplaintEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ComplaintEntity>(ComplaintEntity);

        try {
            const entity = new ComplaintEntity();
            entity.userName = model.userName;
            entity.userEmail = model.userEmail;
            entity.userPhoneNumber = model.userPhoneNumber;
            entity.messageType = (model.messageType as any) || 'message';
            entity.subject = model.subject;
            entity.messageContent = model.messageContent;
            entity.userId = model.userId;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating complaint failed', {
                cause: new Error(`Error creating complaint: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Complaint by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<ComplaintReadModel> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ComplaintEntity>(ComplaintEntity);

        if (!id) {
            throw new BadRequestException('Complaint ID is required');
        }

        const complaint = await repository.findOne({
            where: { id },
        });

        if (!complaint) {
            throw new NotFoundException(`Complaint with ID ${id} not found`);
        }

        return ComplaintReadModel.fromEntity(complaint);
    }

    /** ✅ Get All Complaints */
    async getAll(options?: IQueryOptions): Promise<ComplaintReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ComplaintEntity>(ComplaintEntity);

        const complaints = await repository.find({
            order: { createdAt: 'DESC' },
        });

        return ComplaintReadModel.fromEntities(complaints);
    }

    /** ✅ Get Complaints by User ID */
    async getByUserId(
        userId: string,
        options?: IQueryOptions,
    ): Promise<ComplaintReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ComplaintEntity>(ComplaintEntity);

        const complaints = await repository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });

        return ComplaintReadModel.fromEntities(complaints);
    }

    /** ✅ Get Complaints by Message Type */
    async getByMessageType(
        messageType: string,
        options?: IQueryOptions,
    ): Promise<ComplaintReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ComplaintEntity>(ComplaintEntity);

        const complaints = await repository.find({
            where: { messageType: messageType as any },
            order: { createdAt: 'DESC' },
        });

        return ComplaintReadModel.fromEntities(complaints);
    }

    /** ✅ Get Complaints by Email */
    async getByEmail(
        email: string,
        options?: IQueryOptions,
    ): Promise<ComplaintReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<ComplaintEntity>(ComplaintEntity);

        const complaints = await repository.find({
            where: { userEmail: email },
            order: { createdAt: 'DESC' },
        });

        return ComplaintReadModel.fromEntities(complaints);
    }
}
