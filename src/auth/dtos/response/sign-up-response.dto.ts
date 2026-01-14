import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IPublic } from 'src/common/utils/public.type';

export class SignUpResponseDto {
  static fromModel(model: {
    userId: string;
    message: string;
    accessToken?: string;
    refreshToken?: string;
    existing?: boolean;
    otpCode?: number;
  }): IPublic<SignUpResponseDto> {
    const response: IPublic<SignUpResponseDto> = {
      message: model.message,
      userId: model.userId,
    };

    if (model.accessToken) {
      response.accessToken = model.accessToken;
    }

    if (model.refreshToken) {
      response.refreshToken = model.refreshToken;
    }

    if (model.otpCode) {
      response.otpCode = model.otpCode;
    }

    if (model.existing !== undefined) {
      response.existing = model.existing;
    }

    return response;
  }

  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  accessToken?: string;

  @ApiPropertyOptional()
  refreshToken?: string;

  @ApiPropertyOptional()
  existing?: boolean;

  @ApiProperty()
  otpCode?: number;
}
