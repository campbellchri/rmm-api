import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordWithTokenResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Password has been reset successfully',
  })
  message: string;

  @ApiProperty({
    description: 'User ID',
    example: 'user-uuid',
  })
  userId: string;

  static fromModel(model: { message: string; userId: string }): ResetPasswordWithTokenResponseDto {
    const dto = new ResetPasswordWithTokenResponseDto();
    dto.message = model.message;
    dto.userId = model.userId;
    return dto;
  }
}
