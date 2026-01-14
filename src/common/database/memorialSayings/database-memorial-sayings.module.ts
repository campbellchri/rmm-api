import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { MemorialSayingsRepository } from './repositories/memorial-sayings.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [MemorialSayingsRepository],
    exports: [MemorialSayingsRepository],
})
export class DatabaseMemorialSayingsModule { }
