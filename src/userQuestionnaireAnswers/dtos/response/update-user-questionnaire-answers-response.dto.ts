import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateUserQuestionnaireAnswersResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateUserQuestionnaireAnswersResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}