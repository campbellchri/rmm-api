import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class SignInRequestDto {
  @ApiPropertyOptional({ example: 'example@gmail.com' })
  @ValidateIf((o) => !o.googleId && !o.facebookId)
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required for email sign in' })
  email?: string;

  @ApiPropertyOptional({ example: 'password' })
  @ValidateIf((o) => !o.googleId && !o.facebookId)
  @IsNotEmpty({ message: 'Password is required for email sign in' })
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'google_user_id_123' })
  @IsString()
  @IsOptional()
  googleId?: string;

  @ApiPropertyOptional({ example: 'facebook_user_id_123' })
  @IsString()
  @IsOptional()
  facebookId?: string;
}
