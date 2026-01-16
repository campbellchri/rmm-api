import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/common/decorators/combined-validations.decorator';

export class ResetPasswordWithTokenRequestDto {
  @ApiProperty({
    description: 'Password reset token received via email',
    example: '7f4a9c2b8e1d3f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
  })
  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'NewStrongPassword@123',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be strong and contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    },
  )
  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'NewStrongPassword@123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Confirm new password is required' })
  @Match('newPassword', { message: 'Confirm password must match new password' })
  confirmPassword: string;
}
