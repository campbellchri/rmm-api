import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { AuthProviderService } from '../providers/authProvider/auth-provider.service';
import { JWTTokenService } from '../jwtToken/jwtToken.service';
import { DecodedIdToken } from '../interfaces/decoded-id-token.interface';

@Injectable()
export class DecodeUserIdTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: PinoLogger,
    private readonly authProviderService: AuthProviderService,
    private readonly jwtTokenService: JWTTokenService,
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    
    // Check if decodedIdToken is already set by middleware
    if (req.decodedIdToken) {
      return next.handle();
    }

    // If middleware set it to null, it means validation already failed
    if (req.decodedIdToken === null) {
      this.logger.error('Token validation failed in middleware');
      throw new UnauthorizedException('Invalid or expired token');
    }

    // If not set, try to decode it from authorization header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
      this.logger.error('Authorization header is missing');
      throw new UnauthorizedException('Authorization header is required');
    }

    try {
      // Handle both 'Bearer token' and 'bearer token' formats
      const token: string = authHeader.replace(/^Bearer\s+/i, '');
      
      if (!token || token === authHeader) {
        this.logger.error('Invalid authorization header format', { header: authHeader.substring(0, 20) + '...' });
        throw new UnauthorizedException('Invalid authorization header format');
      }

      // Try JWT token validation first (for regular email/password auth)
      try {
        const jwtPayload = await this.jwtTokenService.verifyAccessToken(token);
        // Map JWT payload to DecodedIdToken format
        req.decodedIdToken = {
          ...jwtPayload,
          email: jwtPayload.user?.email || '',
          auth_time: jwtPayload.iat || Math.floor(Date.now() / 1000),
          iat: jwtPayload.iat || Math.floor(Date.now() / 1000),
          exp: jwtPayload.exp || 0,
        } as DecodedIdToken;
        return next.handle();
      } catch (jwtError) {
        // If JWT validation fails, try Firebase ID token validation (for social auth)
        try {
          req.decodedIdToken = await this.authProviderService.validateToken(token);
          return next.handle();
        } catch (firebaseError) {
          // Both validations failed
          const jwtErrorMsg = jwtError?.message || jwtError?.toString() || 'Unknown JWT error';
          const firebaseErrorMsg = firebaseError?.message || firebaseError?.toString() || 'Unknown Firebase error';
          this.logger.error('Token validation failed for both JWT and Firebase', {
            jwtError: jwtErrorMsg,
            firebaseError: firebaseErrorMsg,
            jwtCode: jwtError?.code,
            firebaseCode: firebaseError?.code,
          });
          throw new UnauthorizedException('Invalid or expired token');
        }
      }
    } catch (err) {
      // If it's already an UnauthorizedException, rethrow it
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      // Log unexpected errors
      const errorMessage = err?.message || err?.toString() || 'Unknown error';
      const errorCode = err?.code || 'NO_CODE';
      this.logger.error('Unexpected error during token validation', {
        error: errorMessage,
        code: errorCode,
        stack: err?.stack,
      });
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}