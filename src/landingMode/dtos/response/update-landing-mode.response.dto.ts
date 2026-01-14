import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateLandingModeResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateLandingModeResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}