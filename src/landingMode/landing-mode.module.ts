import { forwardRef, Module } from '@nestjs/common';
import { DatabaseLandingModeModule } from 'src/common/database/landingMode/database-landing-mode.module';
import { LandingModeController } from './controllers/landing-mode.controller';
import { LandingModeService } from './services/landing-mode.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseLandingModeModule, JwtTokenModule],
    controllers: [LandingModeController],
    providers: [LandingModeService],
    exports: [LandingModeService],
})
export class LandingModeModule { }
