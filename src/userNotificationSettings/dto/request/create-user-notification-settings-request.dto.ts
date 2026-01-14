import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserNotificationSettingRequestDto {
  @ApiProperty({ example: '04175c2d-c9f5-435c-b82c-7e3ae4d2c821' })
  @IsString()
  userId: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  IsInAppAllowed?: boolean = true;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  IsEmailAllowed?: boolean = false;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  IsDesktopNotificationAllowed?: boolean = true;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  IsUnreadBadgeEnabled?: boolean = false;
}
