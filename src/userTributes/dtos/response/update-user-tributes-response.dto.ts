import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserTributesResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateUserTributesResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}