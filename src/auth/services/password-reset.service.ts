import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PinoLogger } from 'nestjs-pino';
import { UserRepository } from 'src/common/database/user/repositories/user.repository';
import { EmailService } from 'src/common/services/email/email.service';
import { UsersService } from 'src/users/services/users.service';
import { ForgotPasswordModel } from '../models/forgot-password-model';
import { ResetPasswordWithTokenModel } from '../models/reset-password-with-token-model';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Handles forgot password request
   * Generates a secure reset token, stores it, and sends email
   */
  // async forgotPassword(
  //   model: ForgotPasswordModel,
  // ): Promise<{ message: string }> {
  //   try {
  //     const { email } = model;

  //     // Find user by email
  //     const user = await this.usersService.findByEmail(email);

  //     // Security: Don't reveal if email exists or not
  //     // Always return success message
  //     if (!user) {
  //       this.logger.warn(`Password reset requested for non-existent email: ${email}`);
  //       return {
  //         message:
  //           'If an account with that email exists, a password reset link has been sent.',
  //       };
  //     }

  //     // Check if user has a password (not social login only)
  //     const userWithPassword = await this.usersService.findByIdWithPassword(user.id);
  //     if (!userWithPassword.password) {
  //       this.logger.warn(`Password reset requested for user without password: ${user.id}`);
  //       return {
  //         message:
  //           'If an account with that email exists, a password reset link has been sent.',
  //       };
  //     }

  //     // Generate secure reset token
  //     const resetToken = this.generateResetToken();

  //     // Hash the token before storing
  //     const hashedToken = this.hashToken(resetToken);

  //     // Set token expiry (30 minutes)
  //     const expiresAt = this.getTokenExpiry();

  //     // Store hashed token and expiry in database
  //     await this.userRepository.setPasswordResetToken(
  //       user.id,
  //       hashedToken,
  //       expiresAt,
  //     );

  //     // Build reset link
  //     const resetLink = this.buildResetLink(resetToken);

  //     // Send email via SendGrid
  //     try {
  //       // Log user name for debugging
  //       this.logger.info(`Sending password reset email to ${email} for user: ${user.firstName} ${user.lastName}`);
        
  //       await this.emailService.sendPasswordResetEmail(
  //         email,
  //         resetLink,
  //         user.firstName?.trim(),
  //         user.lastName?.trim(),
  //       );
  //       this.logger.info(`Password reset email sent to ${email}`);
  //     } catch (emailError) {
  //       console.log(emailError, 'emailError in forgot password');
  //       this.logger.error(`Failed to send password reset email to ${email}`, emailError);
  //       // Don't throw - still return success message for security
  //     }

  //     return {
  //       message:
  //         'If an account with that email exists, a password reset link has been sent.',
  //     };
  //   } catch (error) {
  //     this.logger.error('Forgot password failed', error);
  //     // Always return success message for security
  //     return {
  //       message:
  //         'If an account with that email exists, a password reset link has been sent.',
  //     };
  //   }
  // }

  /**
   * Handles password reset with token
   * Validates token, checks expiry, and updates password
   */
  // async resetPassword(
  //   model: ResetPasswordWithTokenModel,
  // ): Promise<{ message: string; userId: string }> {
  //   try {
  //     const { token, newPassword, confirmPassword } = model;

  //     if (!token || !newPassword || !confirmPassword) {
  //       throw new BadRequestException('Token and new password are required');
  //     }

  //     if (newPassword !== confirmPassword) {
  //       throw new BadRequestException('New password and confirm password do not match');
  //     }

  //     // Hash the provided token to compare with stored hash
  //     const hashedToken = this.hashToken(token);

  //     // Find user by reset token
  //     const user = await this.userRepository.findByPasswordResetToken(hashedToken);

  //     if (!user) {
  //       throw new BadRequestException('Invalid or expired reset token');
  //     }

  //     // Hash the new password
  //     const hashedPassword = await this.hashPassword(newPassword);

  //     // Update password and clear reset token
  //     await this.userRepository.updatePassword(user.id, hashedPassword);

  //     this.logger.info(`Password reset successful for user ${user.id}`);

  //     return {
  //       message: 'Password has been reset successfully',
  //       userId: user.id,
  //     };
  //   } catch (error) {
  //     this.logger.error('Reset password failed', error);

  //     if (
  //       error instanceof BadRequestException ||
  //       error instanceof InternalServerErrorException
  //     ) {
  //       throw error;
  //     }

  //     throw new InternalServerErrorException('Failed to reset password', {
  //       cause: new Error(`Resetting password failed: ${error?.message}`),
  //     });
  //   }
  // }

  /**
   * Generates a cryptographically secure random token
   */
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hashes a token using SHA-256
   */
  private hashToken(token: string): string {
    return crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
  }

  /**
   * Gets token expiry date (30 minutes from now)
   */
  private getTokenExpiry(): Date {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);
    return expiresAt;
  }

  /**
   * Builds the password reset link
   */
  private buildResetLink(token: string): string {
    const frontendUrl = this.configService.get<string>('appUrl') || 'http://localhost:3000';
    return `${frontendUrl}/reset-password?token=${token}`;
  }

  /**
   * Hashes a password using bcrypt
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
