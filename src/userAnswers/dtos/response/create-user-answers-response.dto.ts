import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateUserAnswersResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateUserAnswersResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}