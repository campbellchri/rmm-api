import { Module } from '@nestjs/common';
import { DatabaseMemorialQRCodesModule } from 'src/common/database/memorialQRCodes/database-memorial-qr-codes.module';
import { MemorialQRCodeController } from './controllers/memorial-qr-code.controller';
import { MemorialQRCodeService } from './services/memorial-qr-code.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseMemorialQRCodesModule, JwtTokenModule],
    controllers: [MemorialQRCodeController],
    providers: [MemorialQRCodeService],
    exports: [MemorialQRCodeService],
})
export class MemorialQRCodesModule { }
