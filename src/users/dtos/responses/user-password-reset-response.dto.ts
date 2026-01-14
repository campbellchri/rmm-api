import { ApiProperty } from '@nestjs/swagger';
import { IPublic } from '../../../common/utils/public.type';

export class UserPasswordResetResponseDto {
  static fromModel(model: { userId: string }): IPublic<UserPasswordResetResponseDto> {
    return { id: model.userId };
  }

  @ApiProperty()
  id: string;
}
