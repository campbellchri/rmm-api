import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { v4 as uuid } from 'uuid';
import { UsersService } from 'src/users/services/users.service';
import { JWTTokenService } from 'src/common/jwtToken/jwtToken.service';
import { UserReadModel } from 'src/users/models/user-read-model.model';
import { SignInDataCreateModel } from '../models/signin-data-create.model';
import { SignUpDataCreateModel } from '../models/signup-data-create.model';
import {
  SignInResponseModel,
  SignUpResponseModel,
} from '../models/signup-data-read.model';
import { PinoLogger } from 'nestjs-pino';
import { USER_ROLES } from 'src/users/enums/user-roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JWTTokenService,
    private readonly logger: PinoLogger,
  ) {}

  public async signUp(
    model: SignUpDataCreateModel,
  ): Promise<SignUpResponseModel> {
    try {
      const { name, email, password, googleId, facebookId } = model;

      // Check if it's social sign up
      if (googleId || facebookId) {
        return await this.handleSocialSignUp(model, googleId, facebookId);
      }

      // Regular email/password sign up
      if (!email || !password) {
        throw new BadRequestException('Email and password are required for sign up');
      }

      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Split name into firstName and lastName (use first word as firstName, rest as lastName)
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || name;
      const lastName = nameParts.slice(1).join(' ') || '';

      // Create user with default 'user' role
      const createdUser = await this.usersService.create({
        // id: uuid(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        roles: [USER_ROLES.USER],
      });

      // Generate tokens
      const tokens = await this.generateTokens(createdUser);

      return {
        message: 'User created successfully',
        userId: createdUser.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        existing: false,
      };
    } catch (error) {
      console.log(error);
      this.handleSignUpError(error);
    }
  }

  public async signIn(
    model: SignInDataCreateModel,
  ): Promise<SignInResponseModel> {
    try {
      const { email, password, googleId, facebookId } = model;

      // Social sign in
      if (googleId || facebookId) {
        return await this.handleSocialSignIn(googleId, facebookId);
      }

      // Email/password sign in
      if (!email || !password) {
        throw new BadRequestException('Email and password are required for sign in');
      }

      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Get user with password for verification
      const userWithPassword = await this.usersService.findByIdWithPassword(user.id);
      if (!userWithPassword.password) {
        throw new BadRequestException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, userWithPassword.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Incorrect password');
      }

      const tokens = await this.generateTokens(user);

      return SignInResponseModel.fromObject({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        name: user.firstName,
        surName: user.lastName,
        userId: user.id,
        role: user.roles,
      });
    } catch (error) {
      this.handleSignInError(error);
    }
  }

  public async refreshToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      const payload = await this.jwtService.verifyRefreshToken(refreshToken);
      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const access_token = await this.jwtService.generateAccessToken(user);

      return { access_token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to refresh token');
    }
  }

  public async validateToken(token: string): Promise<any> {
    return await this.jwtService.verifyAccessToken(token);
  }

  // Private helper methods

  private async handleSocialSignUp(
    model: SignUpDataCreateModel,
    googleId?: string | null,
    facebookId?: string | null,
  ): Promise<SignUpResponseModel> {
    // Check if user already exists by social ID
    const existingSocialUser = await this.usersService.findUserBySocialId(
      googleId || undefined,
      facebookId || undefined,
    );

    let user: UserReadModel;
    let isExisting = false;

    if (existingSocialUser) {
      user = existingSocialUser;
      isExisting = true;
    } else {
      // Split name into firstName and lastName
      const nameParts = model.name.trim().split(/\s+/);
      const firstName = nameParts[0] || model.name;
      const lastName = nameParts.slice(1).join(' ') || '';

      // Create new user with social ID and default 'user' role
      user = await this.usersService.create({
        id: uuid(),
        firstName: firstName,
        lastName: lastName,
        email: model.email || null,
        googleId: googleId || undefined,
        facebookId: facebookId || undefined,
        roles: [USER_ROLES.USER],
      });
    }

    const tokens = await this.generateTokens(user);

    return {
      message: isExisting
        ? 'User already exists, logging in.'
        : 'User created successfully with social login.',
      userId: user.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      existing: isExisting,
    };
  }

  private async handleSocialSignIn(
    googleId?: string | null,
    facebookId?: string | null,
  ): Promise<SignInResponseModel> {
    const user = await this.usersService.findUserBySocialId(
      googleId || undefined,
      facebookId || undefined,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokens = await this.generateTokens(user);

    return SignInResponseModel.fromObject({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      name: user.firstName,
      surName: user.lastName,
      userId: user.id,
      role: user.roles,
    });
  }

  private async generateTokens(user: UserReadModel): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = await this.jwtService.generateAccessToken(user);
    const refreshToken = await this.jwtService.generateRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  private handleSignUpError(error: any): never {
    this.logger.error('SignUp failed', error);

    if (
      error instanceof BadRequestException ||
      error instanceof ConflictException ||
      error instanceof InternalServerErrorException
    ) {
      throw error;
    }

    throw new InternalServerErrorException('Failed to sign up user', {
      cause: new Error(`Sign Up failed: ${error?.message}`),
    });
  }

  private handleSignInError(error: any): never {
    this.logger.error('SignIn failed', error);

    if (
      error instanceof BadRequestException ||
      error instanceof InternalServerErrorException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }

    throw new InternalServerErrorException('Failed to sign in', {
      cause: new Error(`Signing In failed: ${error?.message}`),
    });
  }
}
