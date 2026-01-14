import { UserEntity } from '../../common/database/user/entities/user.entity';
import { IPublic } from '../../common/utils/public.type';
import { UserRoles } from '../enums/user-roles.enum';

export interface UserReadModelOptions {
  includePassword?: boolean;
}

export class UserReadModel {
  static fromEntity(
    entity: UserEntity,
    options: UserReadModelOptions = {},
  ): IPublic<UserReadModel> | null {
    if (!entity) {
      return null;
    }

    const model: any = {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      roles: entity.roles,
      callingCode: entity.callingCode,
      phone: entity.phone,
      gender: entity.gender,
      email: entity.email || null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      photoId: entity.photoId,
      photoURL: entity.photoURL,
      country: entity.country,
      street1: entity.street1,
      street2: entity.street2,
      city: entity.city,
      state: entity.state,
      postal: entity.postal,
    };

    // ✅ Conditionally include password
    if (options.includePassword) {
      model.password = entity.password ?? null;
    }

    return model;
  }

  static fromEntityWithPassword(entity: UserEntity): UserReadModel {
    return this.fromEntity(entity, { includePassword: true }) as UserReadModel;
  }

  id: string;

  firstName: string;

  lastName: string;

  phone: string;

  callingCode: string;

  gender?: string;

  email: string;

  roles: UserRoles[];

  createdAt: Date;

  updatedAt: Date;

  country?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postal?: string;
  photoId?: string;
  photoURL?: string;


  password: string | null;
}
