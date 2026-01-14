import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MemorialSayingsRepository } from 'src/common/database/memorialSayings/repositories/memorial-sayings.repository';
import { CreateMemorialSayingModel } from '../models/create-memorial-saying-model';

@Injectable()
export class MemorialSayingsService {
    constructor(
        private readonly memorialSayingsRepository: MemorialSayingsRepository,
    ) {}

    /** ✅ Create Many Sayings */
    async createMany(
        memorialId: string,
        models: CreateMemorialSayingModel[],
    ): Promise<void> {
        try {
            await this.memorialSayingsRepository.createMany(models, memorialId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create sayings', {
                cause: new Error(`Error creating sayings: ${error?.message}`),
            });
        }
    }
}
