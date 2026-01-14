import { forwardRef, Module } from '@nestjs/common';

import { DatabaseUserNotificationSettingsModule } from 'src/common/database/userNotificationSettings/database-user-notification-settings.module';
import { UserNotificationSettingsController } from './controllers/user-notification-settings.controller';
import { UserNotificationSettingsService } from './services/user-notification-settings.service';
import { JwtTokenModule } from 'src/common/jwtToken/jwtToken.module';



@Module({
  imports: [DatabaseUserNotificationSettingsModule, JwtTokenModule],
  controllers: [UserNotificationSettingsController],
  providers: [UserNotificationSettingsService],
  exports: [UserNotificationSettingsService],
})
export class UserNotificationSettingsModule { }
