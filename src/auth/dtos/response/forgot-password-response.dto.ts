import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'If an account with that email exists, a password reset link has been sent.',
  })
  message: string;

  static fromModel(message: string): ForgotPasswordResponseDto {
    const dto = new ForgotPasswordResponseDto();
    dto.message = message;
    return dto;
  }
}
