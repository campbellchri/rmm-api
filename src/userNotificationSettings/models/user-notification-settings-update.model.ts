import { UpdateUserNotificationSettingsRequestDto } from "../dto/request/update-user-notification-settings-request.dto";

export class UpdateUserNotificationSettingModel {
    static fromDto(dto: UpdateUserNotificationSettingsRequestDto): UpdateUserNotificationSettingModel {
        return {
            IsInAppAllowed: dto.IsInAppAllowed,
            IsEmailAllowed: dto.IsEmailAllowed,
            IsDesktopNotificationAllowed: dto.IsDesktopNotificationAllowed,
            IsUnreadBadgeEnabled: dto.IsUnreadBadgeEnabled,
        };
    }

    IsInAppAllowed?: boolean;
    IsEmailAllowed?: boolean;
    IsDesktopNotificationAllowed?: boolean;
    IsUnreadBadgeEnabled?: boolean;
}
