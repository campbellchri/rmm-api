import { IPublic } from "src/common/utils/public.type";
import { CreateUserNotificationSettingRequestDto } from "src/userNotificationSettings/dto/request/create-user-notification-settings-request.dto";

export class CreateUserNotificationSettingModel {
  static fromDto(dto: CreateUserNotificationSettingRequestDto): IPublic<CreateUserNotificationSettingModel> {
    return {
      userId: dto.userId,
      title: 'Notification Settings', // Hardcoded title
      description: 'Manage your notification preferences', // Hardcoded description
      IsInAppAllowed: dto.IsInAppAllowed ?? true,
      IsEmailAllowed: dto.IsEmailAllowed ?? false,
      IsDesktopNotificationAllowed: dto.IsDesktopNotificationAllowed ?? true,
      IsUnreadBadgeEnabled: dto.IsUnreadBadgeEnabled ?? false,
    };
  }

  userId: string;
  title: string;
  description: string;
  IsInAppAllowed: boolean;
  IsEmailAllowed: boolean;
  IsDesktopNotificationAllowed: boolean;
  IsUnreadBadgeEnabled: boolean;
}