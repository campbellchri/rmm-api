import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordOtpResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'OTP verified successfully. You can now reset your password.',
  })
  message: string;

  @ApiProperty({
    description: 'User ID for password reset',
    example: 'user-123',
  })
  userId: string;

  @ApiProperty({
    description: 'Reset token for password change',
    example: 'reset-token-abc123',
  })
  resetToken: string;

  static fromModel(userId: string, resetToken: string): ResetPasswordOtpResponseDto {
    const response = new ResetPasswordOtpResponseDto();
    response.message = 'OTP verified successfully. You can now reset your password.';
    response.userId = userId;
    response.resetToken = resetToken;
    return response;
  }
}
