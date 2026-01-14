import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserMediaResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateUserMediaResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}