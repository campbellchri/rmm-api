import { forwardRef, Module } from '@nestjs/common';
import { DatabaseMemorialsModule } from 'src/common/database/memorials/database-memorials.module';
import { MemorialController } from './controllers/memorial.controller';
import { MemorialService } from './services/memorial.service';
import { UserMediaModule } from 'src/userMedia/user-media.module';
import { UserTributeModule } from 'src/userTributes/user-tributes.module';
import { MemorialSayingsModule } from 'src/memorialSayings/memorial-sayings.module';
import { LandingModeModule } from 'src/landingMode/landing-mode.module';
import { MemorialQRCodesModule } from 'src/memorialQRCodes/memorial-qr-codes.module';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';



@Module({
    imports: [
        DatabaseMemorialsModule, 
        UserMediaModule, 
        UserTributeModule, 
        MemorialSayingsModule, 
        LandingModeModule,
        MemorialQRCodesModule,
        JwtTokenModule
    ],
    controllers: [MemorialController],
    providers: [MemorialService],
    exports: [MemorialService],
})
export class MemorialModule { }