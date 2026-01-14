import { UserAuthProvider, UserStatus } from 'src/users/enums/users.enum';
import { UserRoles } from 'src/users/enums/user-roles.enum';

export interface DecodedIdToken {
  uid: string;
  email: string;
  auth_time: number;
  iat: number;
  exp: number;
  sub: string | number;
  user: UserData;
  [key: string]: any;
}

export interface JwtPayload {
  uid: string;
  sub: string | number;
  iat?: number;
  exp?: number;
  user?: UserData;
}

export interface UserData {
  id: string;
  name: string;
  surName: string;
  email?: string;
  phoneNumber?: string;
  role?: RoleData;
  status?: UserStatus;
  isPhoneNumberVerified?: boolean;
  authProvider: UserAuthProvider;
}

export interface RoleData {
  id: string;
  role: UserRoles;
}

