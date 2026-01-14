import { IPublic } from "src/common/utils/public.type";
import { SetNewPasswordRequestDto } from "../dtos/requests/user-set-new-password-request.dto";

export class SetNewPasswordModel {
    static fromDto(dto: SetNewPasswordRequestDto): IPublic<SetNewPasswordModel> {
        return {
            email: dto.email,
            password: dto.password,
            confirmPassword: dto?.confirmPassword
        }
    }
    email: string
    password: string;
    confirmPassword?: string
}