import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { SubscriptionPackageRepository } from './repositories/subscription-package.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [SubscriptionPackageRepository],
    exports: [SubscriptionPackageRepository],
})
export class DatabaseSubscriptionPackagesModule { }
