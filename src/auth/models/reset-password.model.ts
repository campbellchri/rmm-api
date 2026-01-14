import { IPublic } from 'src/common/utils/public.type';
import { ResetPasswordRequestDto } from '../dtos/request/reset-password-request.dto';

export class ResetPasswordModel {
    static fromDto(dto: ResetPasswordRequestDto, userId: string): IPublic<ResetPasswordModel> {
        return {
            newPassword: dto.newPassword,
            confirmPassword: dto.confirmPassword,
            userId: userId,
        };
    }

    newPassword: string;
    confirmPassword: string;
    userId: string;
}