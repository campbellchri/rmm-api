import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class EmailService {
  private readonly fromEmail: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    const apiKey = this.configService.get<string>('sendgrid.apiKey');
    const fromEmail = this.configService.get<string>('sendgrid.fromEmail');

    if (!apiKey) {
      this.logger.warn('SendGrid API key not configured. Email service will not work.');
    } else {
      sgMail.setApiKey(apiKey);
    }

    this.fromEmail = fromEmail || 'remember.me.memorials.llc@gmail.com';
  }

  async sendPasswordResetEmail(
    to: string,
    resetLink: string,
    firstName?: string,
    lastName?: string,
  ): Promise<void> {
    try {
      const subject = 'Reset Your Password';
      const html = this.getPasswordResetEmailTemplate(resetLink, firstName, lastName);

      const msg = {
        to,
        from: this.fromEmail,
        subject,
        html,
      };

      const data = await sgMail.send(msg);
      console.log(data, 'data in send password reset email');
      this.logger.info(`Password reset email sent to ${to}`);
    } catch (error) {
      console.log(error, 'error in send password reset email');
      this.logger.error(`Failed to send password reset email to ${to}`, error);
      // Don't throw error to prevent revealing if email exists
      throw new InternalServerErrorException('Failed to send password reset email');
    }
  }

  private getPasswordResetEmailTemplate(resetLink: string, firstName?: string, lastName?: string): string {
    let greeting = 'Hello!';
    if (firstName && lastName) {
      // Trim and combine firstName and lastName
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      
      // Check if lastName already contains firstName to avoid duplication
      if (trimmedLastName.includes(trimmedFirstName)) {
        greeting = `Hello ${trimmedLastName}!`;
      } else {
        const fullName = `${trimmedFirstName} ${trimmedLastName}`.trim();
        greeting = `Hello ${fullName}!`;
      }
    } else if (firstName) {
      greeting = `Hello ${firstName.trim()}!`;
    }
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
            <p>${greeting}</p>
            <p>You requested to reset your password.</p>
            <p>Click the link below to set a new password:</p>
            <p style="margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </p>
            <p style="color: #666; font-size: 14px;">
              This link will expire in 30 minutes.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you did not request this password reset, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetLink}" style="color: #4CAF50; word-break: break-all;">${resetLink}</a>
            </p>
          </div>
        </body>
      </html>
    `;
  }
}
