import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserNotificationSettingsResponseDto {
  static fromModel(model: { id: string }): IPublic<UpdateUserNotificationSettingsResponseDto> {
    return { id: model.id };
  }

  @ApiProperty()
  id: string;
}