import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { MemorialQRCodeRepository } from 'src/common/database/memorialQRCodes/repositories/memorial-qr-code.repository';
import { CreateMemorialQRCodeModel } from '../models/create-memorial-qr-code-model';
import { UpdateMemorialQRCodeModel } from '../models/update-memorial-qr-code-model';
import { MemorialQRCodeReadModel } from '../models/read-memorial-qr-code-model';

@Injectable()
export class MemorialQRCodeService {
    constructor(
        private readonly memorialQRCodeRepository: MemorialQRCodeRepository,
    ) {}

    /** ✅ Create QR Code */
    async createQRCode(model: CreateMemorialQRCodeModel): Promise<{ id: string }> {
        try {
            const qrCode = await this.memorialQRCodeRepository.create(model);
            return { id: qrCode.id };
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create QR code', {
                cause: new Error(`Error creating QR code: ${error?.message}`),
            });
        }
    }

    /** ✅ Get QR Code by ID */
    async getQRCodeById(id: string): Promise<MemorialQRCodeReadModel> {
        try {
            return await this.memorialQRCodeRepository.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get QR code', {
                cause: new Error(`Error getting QR code: ${error?.message}`),
            });
        }
    }

    /** ✅ Get QR Code by Memorial ID */
    async getQRCodeByMemorialId(memorialId: string): Promise<MemorialQRCodeReadModel | null> {
        try {
            return await this.memorialQRCodeRepository.getByMemorialId(memorialId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get QR code by memorial ID', {
                cause: new Error(`Error getting QR code: ${error?.message}`),
            });
        }
    }

    /** ✅ Update QR Code */
    async updateQRCode(model: UpdateMemorialQRCodeModel): Promise<{ id: string }> {
        try {
            return await this.memorialQRCodeRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update QR code', {
                cause: new Error(`Error updating QR code: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete QR Code */
    async deleteQRCode(id: string): Promise<{ id: string }> {
        try {
            return await this.memorialQRCodeRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete QR code', {
                cause: new Error(`Error deleting QR code: ${error?.message}`),
            });
        }
    }
}
