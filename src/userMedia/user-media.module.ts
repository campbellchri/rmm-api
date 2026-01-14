import { forwardRef, Module } from '@nestjs/common';
import { DatabaseUserMediaModule } from 'src/common/database/userMedia/database-user-media.module';
import { UserMediaController } from './controllers/user-media.controller';
import { UserMediaService } from './services/user-media.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';


@Module({
    imports: [DatabaseUserMediaModule, JwtTokenModule],
    controllers: [UserMediaController],
    providers: [UserMediaService],
    exports: [UserMediaService],
})
export class UserMediaModule { }