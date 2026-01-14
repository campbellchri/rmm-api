import { ApiProperty } from '@nestjs/swagger';
import { SignInResponseModel } from 'src/auth/models/signup-data-read.model';
import { IPublic } from 'src/common/utils/public.type';

export class VerifyOtpResponseDto {
    static fromModel(model: SignInResponseModel): IPublic<VerifyOtpResponseDto> {
        return {
            userId: model.userId,
            message: "OTP verified successfully",
            accessToken: model.accessToken,
            refreshToken: model.refreshToken,
        };
    }

    @ApiProperty()
    message: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    accessToken?: string;
    
    @ApiProperty()
    refreshToken?: string;
}