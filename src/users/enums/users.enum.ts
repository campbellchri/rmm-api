import { ObjectValues } from '../../common/utils/object-values.type';

export const USER_AUTH_PROVIDER = {
  EMAIL: 'email',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
} as const;

export type UserAuthProvider = ObjectValues<typeof USER_AUTH_PROVIDER>;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned',
  SUSPENDED: 'suspended',
} as const;

export type UserStatus = ObjectValues<typeof USER_STATUS>;
