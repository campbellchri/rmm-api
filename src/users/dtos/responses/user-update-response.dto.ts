import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateUserResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}