import { IPublic } from 'src/common/utils/public.type';
import { SignUpRequestDto } from '../dtos/request/sign-up-request.dto';

export class SignUpDataCreateModel {
  static fromDto(dto: SignUpRequestDto): IPublic<SignUpDataCreateModel> {
    return {
      name: dto.name,
      email: dto.email || null,
      password: dto.password || null,
      googleId: dto.googleId || null,
      facebookId: dto.facebookId || null,
    };
  }

  name: string;
  email?: string | null;
  password?: string | null;
  googleId?: string | null;
  facebookId?: string | null;
}
