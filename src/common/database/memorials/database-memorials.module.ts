import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { MemorialRepository } from './repositories/memorial.repository';



@Module({
    imports: [DatabaseConnectionModule],
    providers: [MemorialRepository],
    exports: [MemorialRepository],
})
export class DatabaseMemorialsModule { }