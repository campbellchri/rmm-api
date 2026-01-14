import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateUserQuestionnaireResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateUserQuestionnaireResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}