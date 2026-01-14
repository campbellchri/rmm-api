import { Module } from '@nestjs/common';
import { DatabaseSubscriptionPackagesModule } from 'src/common/database/subscriptionPackages/database-subscription-packages.module';
import { SubscriptionPackageController } from './controllers/subscription-package.controller';
import { SubscriptionPackageService } from './services/subscription-package.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseSubscriptionPackagesModule, JwtTokenModule],
    controllers: [SubscriptionPackageController],
    providers: [SubscriptionPackageService],
    exports: [SubscriptionPackageService],
})
export class SubscriptionPackagesModule { }
