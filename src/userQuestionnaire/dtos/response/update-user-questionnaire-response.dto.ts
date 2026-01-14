import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserQuestionnaireResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateUserQuestionnaireResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}