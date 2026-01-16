import * as util from 'node:util';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, In } from 'typeorm';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { DATABASE_CONNECTION } from '../../database.consts';
import { UserEntity } from '../entities/user.entity';
import { CreateUserModel } from '../../../../users/models/create-user-model';
import { UserReadModel } from '../../../../users/models/user-read-model.model';
import { UpdateUserModel } from 'src/users/models/update-user-model';
import { hashPassword } from 'src/common/utils/password-hash.util';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) dataSource: DataSource,
    private readonly logger: PinoLogger,
  ) {
    super(dataSource);
  }

  private async _getById(
    id: string,
    options?: IQueryOptions,
  ): Promise<UserEntity> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);

    if (!id) {
      throw new InternalServerErrorException('User ID is required');
    }
    const user = await repository.findOne({
      where: { id },
    });
    return user;
  }

  async getUserIdByPassword(
    id: string,
    options?: IQueryOptions,
  ): Promise<UserReadModel | null> {
    return UserReadModel.fromEntityWithPassword(
      await this._getById(id, options),
    );
  }

  async create(createUserModel: CreateUserModel, options?: IQueryOptions): Promise<UserReadModel> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);

    if (await repository.findOneBy({ id: createUserModel.id })) {
      throw new BadRequestException(`User with provided ID already exists`, {
        cause: new Error(`User with ID: ${createUserModel.id} already exists`),
      });
    }
    const userEntity = new UserEntity();
    Object.assign(userEntity, createUserModel);
    try {
      // ✅ Hash password if provided
      if (createUserModel.password) {
        const hashedPassword = await hashPassword(createUserModel.password, 10);
        userEntity.password = hashedPassword;
      }

      const user = await repository.save(userEntity);
      this.logger.info(`User created ${util.inspect(user)}`);

      return UserReadModel.fromEntity(user);
    } catch (e) {
      throw new InternalServerErrorException('Cannot create new user', {
        cause: new Error(`Cannot create new user: ${e?.message}`),
      });
    }
  }



  async getById(id: string, options?: IQueryOptions): Promise<UserReadModel> {
    const user = await this._getById(id, options);
    // let photoURL: string | null = null;

    // if (user && user.photoId) {
    //   try {
    //     const photoIds = [user.photoId];
    //     const photoIdswithLinks =
    //       await this.uploadStorageService.getObjectsPresignedUrlByIds(photoIds);

    //     if (photoIdswithLinks?.[0]?.url) {
    //       photoURL = photoIdswithLinks[0].url;
    //     }
    //   } catch (error) {
    //     console.error(
    //       `Failed to fetch presigned URL for user ${id}: ${error.message}`,
    //     );
    //   }
    // }
    const userModel = UserReadModel.fromEntity(user);
    // userModel.photoURL = photoURL;
    return userModel;
  }


  async updateUser(
    model: UpdateUserModel,
    options?: IQueryOptions,
  ): Promise<UserReadModel> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);

    try {
      // Get existing user
      const user = await repository.findOne({ where: { id: model.id } });
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      user.firstName = model.firstName ?? user.firstName;
      user.lastName = model.lastName ?? user.lastName;
      user.email = model.email ?? user.email;
      user.phone = model.phone ?? user.phone;
      user.callingCode = model.callingCode ?? user.callingCode;
      user.gender = model.gender ?? user.gender;
      user.roles = model.roles ?? user.roles;
      user.country = model.country ?? user.country;
      user.street1 = model.street1 ?? user.street1;
      user.street2 = model.street2 ?? user.street2;
      user.city = model.city ?? user.city;
      user.state = model.state ?? user.state;
      user.postal = model.postal ?? user.postal;

      const updatedUser = await repository.save(user);
      return UserReadModel.fromEntity(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException('Updating user failed', {
        cause: new Error(`Updating user failed: ${error?.message}`),
      });
    }
  }

  async findByEmail(email: string, options?: IQueryOptions): Promise<UserEntity | null> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);
    return await repository.findOne({ where: { email } });
  }

  async findByPhone(phone: string, callingCode: string, options?: IQueryOptions): Promise<UserEntity | null> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);
    return await repository.findOne({ where: { phone, callingCode } });
  }

  async findUserBySocialId(
    googleId?: string,
    facebookId?: string,
    options?: IQueryOptions,
  ): Promise<UserEntity | null> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);

    if (googleId) {
      const user = await repository.findOne({ where: { googleId } });
      if (user) return user;
    }

    if (facebookId) {
      const user = await repository.findOne({ where: { facebookId } });
      if (user) return user;
    }

    return null;
  }

  async updateSocialIds(
    id: string,
    googleId?: string,
    facebookId?: string,
    options?: IQueryOptions,
  ): Promise<void> {
    const { entityManager } = this.parseOptions(options);
    const repository = entityManager.getRepository<UserEntity>(UserEntity);

    const user = await repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (googleId !== undefined) {
      user.googleId = googleId;
    }
    if (facebookId !== undefined) {
      user.facebookId = facebookId;
    }

    await repository.save(user);
  }

  // async setPasswordResetToken(
  //   userId: string,
  //   hashedToken: string,
  //   expiresAt: Date,
  //   options?: IQueryOptions,
  // ): Promise<void> {
  //   const { entityManager } = this.parseOptions(options);
  //   const repository = entityManager.getRepository<UserEntity>(UserEntity);

  //   const user = await repository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   user.passwordResetToken = hashedToken;
  //   user.passwordResetExpires = expiresAt;

  //   await repository.save(user);
  // }

  // async findByPasswordResetToken(
  //   hashedToken: string,
  //   options?: IQueryOptions,
  // ): Promise<UserEntity | null> {
  //   const { entityManager } = this.parseOptions(options);
  //   const repository = entityManager.getRepository<UserEntity>(UserEntity);

  //   const user = await repository.findOne({
  //     where: { passwordResetToken: hashedToken },
  //   });

  //   if (!user) {
  //     return null;
  //   }

  //   // Check if token has expired
  //   if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
  //     return null;
  //   }

  //   return user;
  // }

  // async clearPasswordResetToken(
  //   userId: string,
  //   options?: IQueryOptions,
  // ): Promise<void> {
  //   const { entityManager } = this.parseOptions(options);
  //   const repository = entityManager.getRepository<UserEntity>(UserEntity);

  //   const user = await repository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   user.passwordResetToken = null;
  //   user.passwordResetExpires = null;

  //   await repository.save(user);
  // }

  // async updatePassword(
  //   userId: string,
  //   hashedPassword: string,
  //   options?: IQueryOptions,
  // ): Promise<void> {
  //   const { entityManager } = this.parseOptions(options);
  //   const repository = entityManager.getRepository<UserEntity>(UserEntity);

  //   const user = await repository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   user.password = hashedPassword;
  //   // Clear reset token after password is updated
  //   user.passwordResetToken = null;
  //   user.passwordResetExpires = null;

  //   await repository.save(user);
  // }

}

