import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateUserQuestionnaireAnswersResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateUserQuestionnaireAnswersResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}