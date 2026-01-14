import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateTemplateResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateTemplateResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}