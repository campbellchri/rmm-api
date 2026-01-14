import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserAnswersResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateUserAnswersResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}