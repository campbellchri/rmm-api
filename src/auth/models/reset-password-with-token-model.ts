import { IPublic } from '../../common/utils/public.type';
import { ResetPasswordWithTokenRequestDto } from '../dtos/request/reset-password-with-token-request.dto';

export class ResetPasswordWithTokenModel {
  static fromDto(dto: ResetPasswordWithTokenRequestDto): IPublic<ResetPasswordWithTokenModel> {
    return {
      token: dto.token,
      newPassword: dto.newPassword,
      confirmPassword: dto.confirmPassword,
    };
  }

  token: string;
  newPassword: string;
  confirmPassword: string;
}
