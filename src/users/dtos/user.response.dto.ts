import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IPublic } from '../../common/utils/public.type';
import { UserRoles, USER_ROLES } from '../enums/user-roles.enum';
import { UserReadModel } from '../models/user-read-model.model';

export class UserResponseDto {
  static fromModel(model: UserReadModel): IPublic<UserResponseDto> {
    if (!model) return null;

    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      roles: model.roles,
      email: model.email,
      gender: model.gender,
      phone: model.phone,
      callingCode: model.callingCode,
      photoId: model.photoId || null,
      photoURL: model.photoURL || null,
      street1: model?.street1 || null,
      street2: model?.street2 || null,
      city: model?.city || null,
      state: model?.state || null,
      postal: model?.postal || null,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  callingCode?: string;

  @ApiPropertyOptional()
  defaultRole?: string;

  // ✅ Flattened address fields
  @ApiPropertyOptional()
  street1?: string;

  @ApiPropertyOptional()
  street2?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  postal?: string;

  // ✅ New photo fields
  @ApiPropertyOptional()
  photoId?: string;

  @ApiPropertyOptional()
  photoURL?: string;

  @ApiProperty({ isArray: true, enum: USER_ROLES, enumName: 'UserRoles' })
  roles: UserRoles[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

