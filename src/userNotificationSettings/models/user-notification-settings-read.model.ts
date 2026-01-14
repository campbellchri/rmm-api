import { UserNotificationSettingsEntity } from "src/common/database/userNotificationSettings/entities/user-notification-settings.entity";
import { IPublic } from "src/common/utils/public.type";

export class UserNotificationSettingReadModel {

  static fromEntity(entity: UserNotificationSettingsEntity): UserNotificationSettingReadModel {
    return {
      id: entity.id,
      IsInAppAllowed: entity.IsInAppAllowed,
      IsEmailAllowed: entity.IsEmailAllowed,
      IsDesktopNotificationAllowed: entity.IsDesktopNotificationAllowed,
      IsUnreadBadgeEnabled: entity.IsUnreadBadgeEnabled,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: UserNotificationSettingsEntity[],): IPublic<UserNotificationSettingReadModel>[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  id: string;
  IsInAppAllowed: boolean;
  IsEmailAllowed: boolean;
  IsDesktopNotificationAllowed: boolean;
  IsUnreadBadgeEnabled: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

}
