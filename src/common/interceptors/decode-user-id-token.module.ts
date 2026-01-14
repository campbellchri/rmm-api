import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DecodeUserIdTokenInterceptor } from './decode-user-id-token.interceptor';
import { AuthProviderModule } from '../providers/authProvider/auth-provider.module';
import { JwtTokenModule } from '../jwtToken/jwtToken.module';

@Module({
  imports: [AuthProviderModule, JwtTokenModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: DecodeUserIdTokenInterceptor,
    },
  ],
})
export class TokenDecodeInterceptorModule { }
