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
import { LegalDocumentEntity } from '../entities/legal-document.entity';
import { CreateLegalDocumentModel } from 'src/legalDocuments/models/create-legal-document-model';
import { UpdateLegalDocumentModel } from 'src/legalDocuments/models/update-legal-document-model';
import { LegalDocumentReadModel } from 'src/legalDocuments/models/read-legal-document-model';

@Injectable()
export class LegalDocumentRepository extends BaseRepository {
    constructor(
        @Inject(DATABASE_CONNECTION) dataSource: DataSource,
        private readonly logger: PinoLogger,
    ) {
        super(dataSource);
    }

    /** ✅ Create Legal Document */
    async create(
        model: CreateLegalDocumentModel,
        options?: IQueryOptions,
    ): Promise<LegalDocumentEntity> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LegalDocumentEntity>(LegalDocumentEntity);

        // Check if document of this type already exists
        const existing = await repository.findOne({
            where: { type: model.type as any },
        });
        if (existing) {
            throw new BadRequestException(`A ${model.type} document already exists. Use update endpoint instead.`);
        }

        try {
            const entity = new LegalDocumentEntity();
            entity.type = model.type as any;
            entity.content = model.content;
            entity.effectiveDate = model.effectiveDate;

            return await repository.save(entity);
        } catch (error) {
            throw new InternalServerErrorException('Creating legal document failed', {
                cause: new Error(`Error creating legal document: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Legal Document by ID */
    async getById(
        id: string,
        options?: IQueryOptions,
    ): Promise<LegalDocumentReadModel> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LegalDocumentEntity>(LegalDocumentEntity);

        if (!id) {
            throw new BadRequestException('Legal document ID is required');
        }

        const document = await repository.findOne({
            where: { id },
        });

        if (!document) {
            throw new NotFoundException(`Legal document with ID ${id} not found`);
        }

        return LegalDocumentReadModel.fromEntity(document);
    }

    /** ✅ Get Legal Document by Type */
    async getByType(
        type: string,
        options?: IQueryOptions,
    ): Promise<LegalDocumentReadModel | null> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LegalDocumentEntity>(LegalDocumentEntity);

        const document = await repository.findOne({
            where: { type: type as any },
        });

        return document ? LegalDocumentReadModel.fromEntity(document) : null;
    }

    /** ✅ Get All Legal Documents */
    async getAll(options?: IQueryOptions): Promise<LegalDocumentReadModel[]> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LegalDocumentEntity>(LegalDocumentEntity);

        const documents = await repository.find({
            order: { createdAt: 'DESC' },
        });

        return LegalDocumentReadModel.fromEntities(documents);
    }

    /** ✅ Update Legal Document */
    async update(
        model: UpdateLegalDocumentModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LegalDocumentEntity>(LegalDocumentEntity);

        try {
            const document = await repository.findOne({ where: { id: model.id } });
            if (!document) {
                throw new NotFoundException('Legal document not found');
            }

            // Update fields if provided
            document.content = model.content ?? document.content;
            document.effectiveDate = model.effectiveDate ?? document.effectiveDate;

            const updated = await repository.save(document);
            return { id: updated.id };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Updating legal document failed', {
                cause: new Error(`Error updating legal document: ${error?.message}`),
            });
        }
    }

    /** ✅ Upsert Legal Document (Update or Create) */
    async upsert(
        type: string,
        model: CreateLegalDocumentModel,
        options?: IQueryOptions,
    ): Promise<{ id: string }> {
        const { entityManager } = this.parseOptions(options);
        const repository = entityManager.getRepository<LegalDocumentEntity>(LegalDocumentEntity);

        try {
            let document = await repository.findOne({
                where: { type: type as any },
            });

            if (!document) {
                document = new LegalDocumentEntity();
                document.type = type as any;
            }

            // Update all fields
            document.content = model.content;
            document.effectiveDate = model.effectiveDate;

            const saved = await repository.save(document);
            return { id: saved.id };
        } catch (error) {
            throw new InternalServerErrorException('Saving legal document failed', {
                cause: new Error(`Error saving legal document: ${error?.message}`),
            });
        }
    }
}
