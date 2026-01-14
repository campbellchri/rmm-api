import { IPublic } from 'src/common/utils/public.type';
import { SignInRequestDto } from '../dtos/request/sign-in-request.dto';

export class SignInDataCreateModel {
  static fromDto(dto: SignInRequestDto): IPublic<SignInDataCreateModel> {
    return {
      email: dto.email || null,
      password: dto.password || null,
      googleId: dto.googleId || null,
      facebookId: dto.facebookId || null,
    };
  }

  email?: string | null;
  password?: string | null;
  googleId?: string | null;
  facebookId?: string | null;
}
