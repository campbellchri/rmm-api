import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateTemplateResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateTemplateResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}