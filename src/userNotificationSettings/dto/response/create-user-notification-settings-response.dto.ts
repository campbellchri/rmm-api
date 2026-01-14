import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateUserNotificationSettingsResponseDto {
  static fromModel(model: { id: string }): IPublic<CreateUserNotificationSettingsResponseDto> {
    return { id: model.id };
  }

  @ApiProperty()
  id: string;
}