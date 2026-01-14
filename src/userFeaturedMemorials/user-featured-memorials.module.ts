import { Module } from '@nestjs/common';
import { DatabaseUserFeaturedMemorialsModule } from 'src/common/database/userFeaturedMemorials/database-user-featured-memorials.module';
import { UserFeaturedMemorialController } from './controllers/user-featured-memorial.controller';
import { UserFeaturedMemorialService } from './services/user-featured-memorial.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
    imports: [DatabaseUserFeaturedMemorialsModule, JwtTokenModule],
    controllers: [UserFeaturedMemorialController],
    providers: [UserFeaturedMemorialService],
    exports: [UserFeaturedMemorialService],
})
export class UserFeaturedMemorialsModule { }
