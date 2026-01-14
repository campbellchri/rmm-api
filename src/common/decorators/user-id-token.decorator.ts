import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// import { DecodedIdToken } from 'firebase-admin/auth';
import { DecodedIdToken } from '../interfaces/decoded-id-token.interface';

export const UserIdToken = createParamDecorator(
  (data: unknown, context: ExecutionContext): DecodedIdToken => {
    const request = context.switchToHttp().getRequest();

    if (!request.decodedIdToken) {
      throw new UnauthorizedException('Unauthorized or Token expired');
    }

    return request.decodedIdToken;
  },
);

