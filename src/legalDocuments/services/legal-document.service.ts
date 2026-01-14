import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { LegalDocumentRepository } from 'src/common/database/legalDocuments/repositories/legal-document.repository';
import { CreateLegalDocumentModel } from '../models/create-legal-document-model';
import { UpdateLegalDocumentModel } from '../models/update-legal-document-model';
import { LegalDocumentReadModel } from '../models/read-legal-document-model';

@Injectable()
export class LegalDocumentService {
    constructor(
        private readonly legalDocumentRepository: LegalDocumentRepository,
    ) {}

    /** ✅ Create Legal Document */
    async createLegalDocument(model: CreateLegalDocumentModel): Promise<{ id: string }> {
        try {
            const document = await this.legalDocumentRepository.create(model);
            return { id: document.id };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create legal document', {
                cause: new Error(`Error creating legal document: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Legal Document by ID */
    async getLegalDocumentById(id: string): Promise<LegalDocumentReadModel> {
        try {
            return await this.legalDocumentRepository.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get legal document', {
                cause: new Error(`Error getting legal document: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Legal Document by Type */
    async getLegalDocumentByType(type: string): Promise<LegalDocumentReadModel | null> {
        try {
            return await this.legalDocumentRepository.getByType(type);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get legal document by type', {
                cause: new Error(`Error getting legal document: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Legal Documents */
    async getAllLegalDocuments(): Promise<LegalDocumentReadModel[]> {
        try {
            return await this.legalDocumentRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to get legal documents', {
                cause: new Error(`Error getting legal documents: ${error?.message}`),
            });
        }
    }

    /** ✅ Update Legal Document */
    async updateLegalDocument(model: UpdateLegalDocumentModel): Promise<{ id: string }> {
        try {
            return await this.legalDocumentRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update legal document', {
                cause: new Error(`Error updating legal document: ${error?.message}`),
            });
        }
    }

    /** ✅ Upsert Legal Document */
    async upsertLegalDocument(type: string, model: CreateLegalDocumentModel): Promise<{ id: string }> {
        try {
            return await this.legalDocumentRepository.upsert(type, model);
        } catch (error) {
            throw new InternalServerErrorException('Failed to save legal document', {
                cause: new Error(`Error saving legal document: ${error?.message}`),
            });
        }
    }
}
