import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseUsersModule } from '../common/database/user/repositories/database-users.module';;
import { FirebaseModule } from 'src/common/services/firebase/firebase.module';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';

@Module({
  imports: [DatabaseUsersModule, FirebaseModule, JwtTokenModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
