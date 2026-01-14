import { Module } from "@nestjs/common";
import { DatabaseConnectionModule } from "../database.module";
import { UserNotificationSettingsRepository } from "./repositories/user-notification-settings.repository";


@Module({
  imports: [DatabaseConnectionModule],
  providers: [UserNotificationSettingsRepository],
  exports: [UserNotificationSettingsRepository],
})
export class DatabaseUserNotificationSettingsModule { }
