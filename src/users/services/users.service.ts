import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from 'src/common/database/user/repositories/user.repository';
import { CreateUserModel } from '../models/create-user-model'
import { UpdateUserModel } from '../models/update-user-model';
import { UserReadModel } from '../models/user-read-model.model';
import { UpdateUserPasswordModel } from '../models/user-update-password.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async createUser(model: CreateUserModel): Promise<any> {
    try {
      const user = await this.userRepository.create(model);
      return user;
    } catch (error) {
      console.error(error, "error creating user");
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(model: UpdateUserModel): Promise<{ id: string }> {
    try {
      const user = await this.userRepository.updateUser(model);
      return { id: user.id };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  public async findById(id: string): Promise<UserReadModel> {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) {
        throw new BadRequestException('User with this ID does not exist');
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find user by ID', {
        cause: new Error(`Finding user failed: ${error?.message}`),
      });
    }
  }

  public async findByIdWithPassword(id: string): Promise<UserReadModel> {
    try {
      const user = await this.userRepository.getUserIdByPassword(id);
      if (!user) {
        throw new BadRequestException('User with this ID does not exist');
      }
      return user;
    } catch (error) {
      console.error(error, "error finding user by ID");
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find user by ID', {
        cause: new Error(`failed to find user: ${error?.message}`),
      });
    }
  }

  async updateUserPassword(
    id: string,
    password: string,
  ): Promise<UserReadModel> {
    try {
      const user = await this.userRepository.getById(id);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      user.password = password;
      return await this.userRepository.updateUser(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user password');
    }
  }



  public async resetUserPassword(model: UpdateUserPasswordModel): Promise<any> {
    try {
      const user = await this.findByIdWithPassword(model.userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        model.currentPassword,
        user.password,
      );

      if (!isCurrentPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      if (model.currentPassword === model.newPassword) {
        throw new BadRequestException(
          'New password must be different from current password',
        );
      }

      if (model.newPassword !== model.confirmNewPassword) {
        throw new BadRequestException(
          'New password and confirm password do not match',
        );
      }

      const hashedPassword = await bcrypt.hash(model.newPassword, 10);

      const updatedUser = await this.updateUserPassword(
        user.id,
        hashedPassword,
      );

      if (!updatedUser) {
        throw new InternalServerErrorException('Failed to update password');
      }

      return {
        message: 'Password reset successfully',
        userId: updatedUser.id,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to reset password', {
        cause: new Error(`Resetting password failed: ${error?.message}`),
      });
    }
  }

  public async findByEmail(email: string): Promise<UserReadModel | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return null;
      }
      return UserReadModel.fromEntity(user);
    } catch (error) {
      return null;
    }
  }

  public async findByPhone(phone: string, callingCode: string): Promise<UserReadModel | null> {
    try {
      const user = await this.userRepository.findByPhone(phone, callingCode);
      if (!user) {
        return null;
      }
      return UserReadModel.fromEntityWithPassword(user);
    } catch (error) {
      return null;
    }
  }

  public async findUserBySocialId(
    googleId?: string,
    facebookId?: string,
  ): Promise<UserReadModel | null> {
    try {
      const user = await this.userRepository.findUserBySocialId(googleId, facebookId);
      if (!user) {
        return null;
      }
      return UserReadModel.fromEntity(user);
    } catch (error) {
      return null;
    }
  }

  public async create(model: any): Promise<UserReadModel> {
    try {
      // Convert name/surName to firstName/lastName if needed
      const createModel: CreateUserModel = {
        id: model.id || require('uuid').v4(),
        firstName: model.firstName || model.name || '',
        lastName: model.lastName || model.surName || '',
        email: model.email || null,
        phone: model.phone || model.phoneNumber || null,
        callingCode: model.callingCode || null,
        password: model.password || null,
        roles: model.roles || [],
        gender: model.gender || null,
        country: model.country || model.countryCode || null,
        street1: model.street1 || null,
        street2: model.street2 || null,
        city: model.city || null,
        state: model.state || null,
        postal: model.postal || null,
        photoId: model.photoId || null,
        photoURL: model.photoURL || null,
      };

      const userEntity = await this.userRepository.create(createModel);
      
      // Update googleId and facebookId if provided
      if (model.googleId || model.facebookId) {
        await this.userRepository.updateSocialIds(userEntity.id, model.googleId, model.facebookId);
      }

      return userEntity;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user', {
        cause: new Error(`Creating user failed: ${error?.message}`),
      });
    }
  }

  public async createUserOrThrowIfExists(model: any): Promise<UserReadModel> {
    // Check if user exists by email
    if (model.email) {
      const existingUser = await this.findByEmail(model.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Check if user exists by phone
    if (model.phoneNumber && model.callingCode) {
      const existingUser = await this.findByPhone(model.phoneNumber, model.callingCode);
      if (existingUser) {
        throw new ConflictException('User with this phone number already exists');
      }
    }

    // Check if user exists by social ID
    if (model.googleId || model.facebookId) {
      const existingUser = await this.findUserBySocialId(model.googleId, model.facebookId);
      if (existingUser) {
        throw new ConflictException('User with this social ID already exists');
      }
    }

    return await this.create(model);
  }

  public async findUserByPhoneNumber(phoneNumber: string, callingCode: string): Promise<UserReadModel> {
    const user = await this.findByPhone(phoneNumber, callingCode);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async updateUserOtp(userId: string, otpCode: number): Promise<void> {
    // This method needs to be implemented in the repository
    // For now, we'll add a placeholder
    throw new InternalServerErrorException('updateUserOtp not yet implemented');
  }

  public async verifyOtp(userId: string, otpCode: number): Promise<boolean> {
    // This method needs to be implemented in the repository
    // For now, we'll add a placeholder
    throw new InternalServerErrorException('verifyOtp not yet implemented');
  }

}
