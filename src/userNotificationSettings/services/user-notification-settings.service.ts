import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserNotificationSettingsRepository } from 'src/common/database/userNotificationSettings/repositories/user-notification-settings.repository';
import { CreateUserNotificationSettingModel } from '../models/user-notification-settings-create.model';
import { UserNotificationSettingReadModel } from '../models/user-notification-settings-read.model';
import { UpdateUserNotificationSettingModel } from '../models/user-notification-settings-update.model';

@Injectable()
export class UserNotificationSettingsService {
  constructor(
    private readonly userNotificationSettingsRepository: UserNotificationSettingsRepository,
  ) { }

  public async create(
    model: CreateUserNotificationSettingModel,
  ): Promise<{ id: string }> {
    try {
      const notificationSetting = await this.userNotificationSettingsRepository.create(model);
      return notificationSetting
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user notification setting',
        { cause: new Error(error?.message) },
      );
    }
  }

  public async readAll(): Promise<UserNotificationSettingReadModel[]> {
    try {
      const list = await this.userNotificationSettingsRepository.readAll();
      return list;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user notification settings',
        { cause: new Error(error?.message) },
      );
    }
  }

  public async readById(
    id: string,
  ): Promise<UserNotificationSettingReadModel> {
    try {
      const setting = await this.userNotificationSettingsRepository.readById(id)
      if (!setting) {
        throw new NotFoundException('User notification setting not found');
      }
      return setting;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve user notification setting',
        { cause: new Error(error?.message) },
      );
    }
  }

  public async update(
    id: string,
    model: UpdateUserNotificationSettingModel,
  ): Promise<{ id: string }> {
    try {
      const notificationSetting = await this.userNotificationSettingsRepository.update(id, model);
      return notificationSetting;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update user notification setting',
        { cause: new Error(error?.message) },
      );
    }
  }

  public async getByUserId(
    userId: string,
  ): Promise<UserNotificationSettingReadModel | null> {
    try {
      return await this.userNotificationSettingsRepository.getByUserId(userId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve user notification setting by userId',
        { cause: new Error(error?.message) },
      );
    }
  }
}
