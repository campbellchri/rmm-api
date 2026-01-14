import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserReadModel } from 'src/users/models/user-read-model.model';
import { JwtPayload } from '../interfaces/decoded-id-token.interface';

@Injectable()
export class JWTTokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async generateAccessToken(user: UserReadModel): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      uid: user.id,
      user: {
        id: user.id,
        name: user.firstName || '',
        surName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phone ? `${user.callingCode || ''}${user.phone}` : undefined,
        role: user.roles && user.roles.length > 0 ? {
          id: '',
          role: user.roles[0],
        } : undefined,
        status: 'active' as any,
        isPhoneNumberVerified: false,
        authProvider: 'email' as any,
      },
    };

    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(userId: string | number): Promise<string> {
    const payload = { sub: userId, type: 'refresh' };
    return await this.jwtService.signAsync(payload, { expiresIn: '7d' as any });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async generateCustomToken(payload: any, expiresIn: string = '1h'): Promise<string> {
    return await this.jwtService.signAsync(payload, { expiresIn: expiresIn as any });
  }

  async verifyCustomToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
