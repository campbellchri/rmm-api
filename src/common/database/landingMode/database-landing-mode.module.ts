import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { LandingModeRepository } from './repositories/landing-mode.repository';



@Module({
    imports: [DatabaseConnectionModule],
    providers: [LandingModeRepository],
    exports: [LandingModeRepository],
})
export class DatabaseLandingModeModule { }