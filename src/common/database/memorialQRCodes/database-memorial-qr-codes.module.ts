import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { MemorialQRCodeRepository } from './repositories/memorial-qr-code.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [MemorialQRCodeRepository],
    exports: [MemorialQRCodeRepository],
})
export class DatabaseMemorialQRCodesModule { }
