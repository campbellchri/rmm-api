import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { UserMediaRepository } from './repositories/user-media.repository';



@Module({
    imports: [DatabaseConnectionModule],
    providers: [UserMediaRepository],
    exports: [UserMediaRepository],
})
export class DatabaseUserMediaModule { }