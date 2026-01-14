import { ObjectValues } from '../../common/utils/object-values.type';

export const USER_ROLES = {
  ADMIN: 'admin',
  SUPERADMIN: 'superAdmin',
  USER: 'user'
} as const;

export type UserRoles = ObjectValues<typeof USER_ROLES>;
