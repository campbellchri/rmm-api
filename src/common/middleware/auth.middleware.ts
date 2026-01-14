import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserRepository } from '../database/user/repositories/user.repository';
import { AuthProviderService } from '../providers/authProvider/auth-provider.service';
import { JWTTokenService } from '../jwtToken/jwtToken.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JWTTokenService,
  ) { }
  async use(req: Request | any, res: Response, next: () => void) {
    if (req.headers['authorization']) {
      try {
        const userIdToken: string = req.headers['authorization'].replace('Bearer ', '');
        req.decodedIdToken = await this.jwtTokenService.verifyAccessToken(userIdToken);
      } catch (err) {

        req.decodedIdToken = null;
      }
    }


    try {
      req.user = await this.userRepository.getById(req?.decodedIdToken?.uid);
    } catch (err) {
      // AnonymousUser
      req.user = null;
    }
    next();
  }
}
