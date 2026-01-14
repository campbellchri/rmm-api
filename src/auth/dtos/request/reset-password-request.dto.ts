import { ApiProperty } from "@nestjs/swagger";
import { IsStringNotEmpty, IsStrongPassword, Match } from "src/common/decorators/combined-validations.decorator";

export class ResetPasswordRequestDto {
    @ApiProperty()
    @IsStringNotEmpty()
    @IsStrongPassword()
    newPassword: string;

    @ApiProperty()
    @IsStringNotEmpty()
    @Match('newPassword', { message: 'Confirm password must match new password' })
    confirmPassword: string;
}