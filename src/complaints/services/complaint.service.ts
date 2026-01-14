import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ComplaintRepository } from 'src/common/database/complaints/repositories/complaint.repository';
import { CreateComplaintModel } from '../models/create-complaint-model';
import { ComplaintReadModel } from '../models/read-complaint-model';

@Injectable()
export class ComplaintService {
    constructor(
        private readonly complaintRepository: ComplaintRepository,
    ) {}

    /** ✅ Create Complaint */
    async createComplaint(model: CreateComplaintModel): Promise<{ id: string }> {
        try {
            const complaint = await this.complaintRepository.create(model);
            return { id: complaint.id };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create complaint', {
                cause: new Error(`Error creating complaint: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Complaint by ID */
    async getComplaintById(id: string): Promise<ComplaintReadModel> {
        try {
            return await this.complaintRepository.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get complaint', {
                cause: new Error(`Error getting complaint: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Complaints */
    async getAllComplaints(): Promise<ComplaintReadModel[]> {
        try {
            return await this.complaintRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to get complaints', {
                cause: new Error(`Error getting complaints: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Complaints by User ID */
    async getComplaintsByUserId(userId: string): Promise<ComplaintReadModel[]> {
        try {
            return await this.complaintRepository.getByUserId(userId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get user complaints', {
                cause: new Error(`Error getting user complaints: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Complaints by Message Type */
    async getComplaintsByMessageType(messageType: string): Promise<ComplaintReadModel[]> {
        try {
            return await this.complaintRepository.getByMessageType(messageType);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get complaints by type', {
                cause: new Error(`Error getting complaints by type: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Complaints by Email */
    async getComplaintsByEmail(email: string): Promise<ComplaintReadModel[]> {
        try {
            return await this.complaintRepository.getByEmail(email);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get complaints by email', {
                cause: new Error(`Error getting complaints by email: ${error?.message}`),
            });
        }
    }
}
