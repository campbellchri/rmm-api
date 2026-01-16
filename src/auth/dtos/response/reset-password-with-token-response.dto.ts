import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordWithTokenResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Password reset successfully',
  })
  message: string;

  @ApiProperty({
    description: 'User ID',
    example: 'user-123',
  })
  userId: string;

  static fromModel(userId: string): ResetPasswordWithTokenResponseDto {
    const response = new ResetPasswordWithTokenResponseDto();
    response.message = 'Password reset successfully';
    response.userId = userId;
    return response;
  }
}
