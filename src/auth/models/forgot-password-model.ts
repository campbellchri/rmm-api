import { IPublic } from '../../common/utils/public.type';
import { ForgotPasswordRequestDto } from '../dtos/request/forgot-password-request.dto';

export class ForgotPasswordModel {
  static fromDto(dto: ForgotPasswordRequestDto): IPublic<ForgotPasswordModel> {
    return {
      email: dto.email,
    };
  }

  email: string;
}
