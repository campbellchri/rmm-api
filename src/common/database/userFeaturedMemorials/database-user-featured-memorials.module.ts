import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from '../database.module';
import { UserFeaturedMemorialRepository } from './repositories/user-featured-memorial.repository';

@Module({
    imports: [DatabaseConnectionModule],
    providers: [UserFeaturedMemorialRepository],
    exports: [UserFeaturedMemorialRepository],
})
export class DatabaseUserFeaturedMemorialsModule { }
