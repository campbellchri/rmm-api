import { DataSource } from 'typeorm';
import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { UserNotificationSettingsEntity } from '../entities/user-notification-settings.entity';
import { CreateUserNotificationSettingModel } from 'src/userNotificationSettings/models/user-notification-settings-create.model';
import { UserNotificationSettingReadModel } from 'src/userNotificationSettings/models/user-notification-settings-read.model';
import { UpdateUserNotificationSettingModel } from 'src/userNotificationSettings/models/user-notification-settings-update.model';
import { UserEntity } from '../../user/entities/user.entity';


@Injectable()
export class UserNotificationSettingsRepository extends BaseRepository {
  constructor(@Inject(DATABASE_CONNECTION) connection: DataSource) {
    super(connection);
  }

  // Create function
  public async create(
    data: CreateUserNotificationSettingModel,
    options?: IQueryOptions,
  ): Promise<{ id: string }> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository(UserNotificationSettingsEntity);

    try {
      // Verify user exists
      await entityManager.getRepository(UserEntity).findOneByOrFail({ id: data.userId });

      const newEntity = new UserNotificationSettingsEntity();
      newEntity.userId = data.userId;
      // newEntity.title = data.title; // These fields don't exist in entity
      // newEntity.description = data.description;
      newEntity.IsInAppAllowed = data.IsInAppAllowed;
      newEntity.IsEmailAllowed = data.IsEmailAllowed;
      newEntity.IsDesktopNotificationAllowed = data.IsDesktopNotificationAllowed;
      newEntity.IsUnreadBadgeEnabled = data.IsUnreadBadgeEnabled;

      const result = await repository.save(newEntity);
      return { id: result.id };
    } catch (error) {
      throw new InternalServerErrorException('Creating user notification setting failed', {
        cause: new Error(error?.message),
      });
    }
  }

  // Read all
  public async readAll(

    options?: IQueryOptions,
  ): Promise<UserNotificationSettingReadModel[]> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository(UserNotificationSettingsEntity);

    const entities = await repository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const data = UserNotificationSettingReadModel.fromEntities(entities);

    return data;
  }

  // Read by Id
  public async readById(id: string, options?: IQueryOptions): Promise<UserNotificationSettingReadModel> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository(UserNotificationSettingsEntity);

    const entity = await repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!entity) {
      throw new NotFoundException(`UserNotificationSettings with id ${id} not found`);
    }

    return UserNotificationSettingReadModel.fromEntity(entity);
  }

  // Update function
  public async update(
    id: string,
    updateData: UpdateUserNotificationSettingModel,
    options?: IQueryOptions,
  ): Promise<{ id: string }> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository(UserNotificationSettingsEntity);

    const entity = await repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`UserNotificationSettings with id ${id} not found`);
    }

    if (updateData.IsInAppAllowed !== undefined) {
      entity.IsInAppAllowed = updateData.IsInAppAllowed;
    }

    if (updateData.IsEmailAllowed !== undefined) {
      entity.IsEmailAllowed = updateData.IsEmailAllowed;
    }

    if (updateData.IsDesktopNotificationAllowed !== undefined) {
      entity.IsDesktopNotificationAllowed = updateData.IsDesktopNotificationAllowed;
    }

    if (updateData.IsUnreadBadgeEnabled !== undefined) {
      entity.IsUnreadBadgeEnabled = updateData.IsUnreadBadgeEnabled;
    }

    const result = await repository.save(entity);
    return { id: result.id };
  }

  async getById(id: string, options?: IQueryOptions): Promise<UserNotificationSettingReadModel> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserNotificationSettingsEntity>(UserNotificationSettingsEntity);

    const entity = await repository.findOneOrFail({
      where: { id },
      relations: ['user'],
    });

    return UserNotificationSettingReadModel.fromEntity(entity);
  }

  // Get notification settings by userId
  async getByUserId(userId: string, options?: IQueryOptions): Promise<UserNotificationSettingReadModel | null> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserNotificationSettingsEntity>(UserNotificationSettingsEntity);

    const entity = await repository.findOne({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return entity ? UserNotificationSettingReadModel.fromEntity(entity) : null;
  }
}

