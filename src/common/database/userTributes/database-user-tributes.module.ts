import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { UserTributesRepository } from './repositories/user-tributes.repository';



@Module({
    imports: [DatabaseConnectionModule],
    providers: [UserTributesRepository],
    exports: [UserTributesRepository],
})
export class DatabaseUserTributesModule { }