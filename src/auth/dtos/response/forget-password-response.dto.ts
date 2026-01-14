import { ApiProperty } from '@nestjs/swagger';
import { ForgetPasswordResponseModel } from 'src/auth/models/signup-data-read.model';
import { IPublic } from 'src/common/utils/public.type';

export class ForgetPasswordResponseDto {
    static fromModel(model: ForgetPasswordResponseModel): IPublic<ForgetPasswordResponseDto> {
        return {
            userId: model.userId,
            otpCode: model.otpCode,
            message: "OTP sent successfully on the given phone number",
        };
    }

    @ApiProperty()
    message: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    otpCode: number;
}
