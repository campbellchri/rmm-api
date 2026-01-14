import { ApiProperty } from '@nestjs/swagger';
import { IPublic } from 'src/common/utils/public.type';
import { UserNotificationSettingReadModel } from 'src/userNotificationSettings/models/user-notification-settings-read.model';

export class ReadUserNotificationSettingResponseDto {
  static fromModel(
    model: UserNotificationSettingReadModel,
  ): IPublic<ReadUserNotificationSettingResponseDto> {
    if (!model) return null;

    return {
      id: model.id,
      userId: model.userId,
      IsInAppAllowed: model.IsInAppAllowed,
      IsEmailAllowed: model.IsEmailAllowed,
      IsDesktopNotificationAllowed: model.IsDesktopNotificationAllowed,
      IsUnreadBadgeEnabled: model.IsUnreadBadgeEnabled,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  static fromModels(models: UserNotificationSettingReadModel[]): ReadUserNotificationSettingResponseDto[] {
      return models.map((model) => this.fromModel(model));
    }

  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  IsInAppAllowed: boolean;

  @ApiProperty()
  IsEmailAllowed: boolean;

  @ApiProperty()
  IsDesktopNotificationAllowed: boolean;

  @ApiProperty()
  IsUnreadBadgeEnabled: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
