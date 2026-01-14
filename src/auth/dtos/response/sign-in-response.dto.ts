import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SignInResponseModel } from 'src/auth/models/signup-data-read.model';
import { IPublic } from 'src/common/utils/public.type';

export class SignInResponseDto {
  static fromModel(model: SignInResponseModel): IPublic<SignInResponseDto> {
    const response: IPublic<SignInResponseDto> = {
      userId: model.userId,
      name: model.name,
      surName: model.surName,
      refreshToken: model.refreshToken,
      accessToken: model.accessToken,
      role: model.role,
      authProvider: model.authProvider,
    };
    return response;
  }

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  surName?: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  accessToken?: string;

  @ApiPropertyOptional()
  refreshToken?: string;

  @ApiPropertyOptional()
  role?: any;

  @ApiPropertyOptional()
  authProvider?: string;
}
