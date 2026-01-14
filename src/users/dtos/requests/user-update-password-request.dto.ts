import { ApiProperty } from "@nestjs/swagger";
import { IsStringNotEmpty, IsStrongPassword, Match, NotMatch } from "src/common/decorators/combined-validations.decorator";

export class UserUpdatePasswordRequestDto {
  @ApiProperty()
  @IsStringNotEmpty()
  @IsStrongPassword()
  currentPassword: string;

  @ApiProperty()
  @IsStringNotEmpty()
  @IsStrongPassword()
  @NotMatch('currentPassword', { message: 'current Password must not match new password' })
  newPassword: string;

  @ApiProperty()
  @IsStringNotEmpty()
  @Match('newPassword', { message: 'Confirm password must match new password' })
  confirmNewPassword: string;
}
