import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordResetService } from './services/password-reset.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/common/services/email/email.module';
import { DatabaseUsersModule } from 'src/common/database/user/repositories/database-users.module';

@Module({
  imports: [
    UsersModule,
    JwtTokenModule,
    EmailModule,
    DatabaseUsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordResetService],
  exports: [AuthService],
})
export class AuthModule {}
