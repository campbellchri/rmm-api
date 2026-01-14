import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LoginRequiredGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { req } = context.switchToHttp().getRequest();
    return !req.decodedIdToken ? false : true;
  }
}
