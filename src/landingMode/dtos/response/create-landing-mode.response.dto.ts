import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateLandingModeResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateLandingModeResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}