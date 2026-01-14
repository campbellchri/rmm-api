import { Module } from '@nestjs/common';
import { DatabaseMemorialSayingsModule } from 'src/common/database/memorialSayings/database-memorial-sayings.module';
import { MemorialSayingsService } from './services/memorial-sayings.service';

@Module({
    imports: [DatabaseMemorialSayingsModule],
    providers: [MemorialSayingsService],
    exports: [MemorialSayingsService],
})
export class MemorialSayingsModule { }
