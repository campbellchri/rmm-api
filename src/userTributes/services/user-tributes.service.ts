import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

import { CreateUserTributeModel } from '../models/create-user-tributes-model';
import { UpdateUserTributeModel } from '../models/update-user-tributes-model';
import { UserTributeReadModel } from '../models/read-user-tributes-model';
import { UserTributesRepository } from 'src/common/database/userTributes/repositories/user-tributes.repository';

@Injectable()
export class UserTributeService {
    constructor(
        private readonly userTributeRepository: UserTributesRepository,
    ) { }

    /** ✅ Create Tribute */
    async createTribute(model: CreateUserTributeModel): Promise<{ id: string }> {
        try {
            const tribute = await this.userTributeRepository.create(model);
            return { id: tribute.id };
        } catch (error) {
            console.error('Error creating tribute:', error);
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to create tribute', {
                cause: new Error(`Error creating tribute: ${error?.message}`),
            });
        }
    }

    public async createMany(
        memorialId: string,
        tributeList: CreateUserTributeModel[],
    ): Promise<{ ids: string[] }> {
        try {
            const recordsToCreate = tributeList.map((tribute) => ({
                ...tribute,
                memorialId,
            }));

            const result =
                await this.userTributeRepository.createMany(recordsToCreate);
            return { ids: result.map((item) => item.id) };
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user tributes', {
                cause: new Error(`Bulk tribute creation failed: ${error?.message}`),
            });
        }
    }

    public async updateMany(
        memorialId: string,
        tributeList: UpdateUserTributeModel[],
    ): Promise<{ ids: string[] }> {
        try {
            const records = tributeList.map((tribute) => ({
                ...tribute,
                memorialId,
            }));

            const result = await this.userTributeRepository.updateMany(records);
            return { ids: result.map((item) => item.id) };
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user tributes', {
                cause: new Error(`Bulk update tributes failed: ${error?.message}`),
            });
        }
    }



    /** ✅ Update Tribute */
    async updateTribute(model: UpdateUserTributeModel): Promise<{ id: string }> {
        try {
            const existing = await this.userTributeRepository.getById(model.id);
            if (!existing) {
                throw new NotFoundException('Tribute not found');
            }

            return await this.userTributeRepository.update(model);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to update tribute', {
                cause: new Error(`Updating tribute failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Tribute by ID */
    async getTributeById(id: string): Promise<UserTributeReadModel> {
        try {
            const tribute = await this.userTributeRepository.getById(id);
            if (!tribute) throw new NotFoundException('Tribute not found');
            return tribute;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get tribute', {
                cause: new Error(`Getting tribute failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get All Tributes */
    async getAllTributes(): Promise<UserTributeReadModel[]> {
        try {
            return await this.userTributeRepository.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch tribute list', {
                cause: new Error(`Fetching tributes failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Tributes by MemorialId */
    async getTributesByMemorialId(memorialId: string): Promise<UserTributeReadModel[]> {
        try {
            return await this.userTributeRepository.getByMemorialId(memorialId);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch tributes by memorial ID', {
                cause: new Error(`Fetching tributes by memorial ID failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Get Tributes by UserId */
    async getTributesByUserId(userId: string): Promise<UserTributeReadModel[]> {
        try {
            return await this.userTributeRepository.getByUserId(userId);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch tributes by user ID', {
                cause: new Error(`Fetching tributes by user ID failed: ${error?.message}`),
            });
        }
    }

    /** ✅ Delete Tribute */
    async deleteTribute(id: string): Promise<{ id: string }> {
        try {
            return await this.userTributeRepository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete tribute', {
                cause: new Error(`Deleting tribute failed: ${error?.message}`),
            });
        }
    }
}

