import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { IsStringNotEmpty } from "src/common/decorators/combined-validations.decorator";

export class VerifyOtpRequestDto {
    @ApiProperty()
    @IsNumber()
    otpCode: number;

    @ApiProperty()
    @IsStringNotEmpty()
    userId: string;
}