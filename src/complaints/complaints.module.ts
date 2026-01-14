import { Module } from '@nestjs/common';
import { DatabaseComplaintsModule } from 'src/common/database/complaints/database-complaints.module';
import { ComplaintController } from './controllers/complaint.controller';
import { ComplaintService } from './services/complaint.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseComplaintsModule, JwtTokenModule],
    controllers: [ComplaintController],
    providers: [ComplaintService],
    exports: [ComplaintService],
})
export class ComplaintsModule { }
