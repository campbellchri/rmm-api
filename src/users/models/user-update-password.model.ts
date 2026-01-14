import { IPublic } from 'src/common/utils/public.type';
import { UserUpdatePasswordRequestDto } from '../dtos/requests/user-update-password-request.dto';


export class UpdateUserPasswordModel {
    static fromDto(dto: UserUpdatePasswordRequestDto, userId: string): IPublic<UpdateUserPasswordModel> {
        return {
            currentPassword: dto.currentPassword,
            newPassword: dto.newPassword,
            confirmNewPassword: dto.confirmNewPassword,
            userId: userId,
        };
    }

    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    userId: string;
}