import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import {
  IsStrongPassword,
} from 'src/common/decorators/combined-validations.decorator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'example@email.com' })
  @ValidateIf((o) => !o.googleId && !o.facebookId)
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required for email sign up' })
  email?: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => !o.googleId && !o.facebookId)
  @IsStrongPassword({ message: 'Password must be strong and contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required for email sign up' })
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
