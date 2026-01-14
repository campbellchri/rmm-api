import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { ComplaintRepository } from './repositories/complaint.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [ComplaintRepository],
    exports: [ComplaintRepository],
})
export class DatabaseComplaintsModule { }
