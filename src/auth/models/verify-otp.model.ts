import { IPublic } from 'src/common/utils/public.type';
import { VerifyOtpRequestDto } from '../dtos/request/verify-otp-request.dto';

export class VerifyOtpModel {
    static fromDto(dto: VerifyOtpRequestDto): IPublic<VerifyOtpModel> {
        return {
            otpCode: dto.otpCode,
            userId: dto.userId,
        };
    }

    otpCode: number;
    userId: string;

}