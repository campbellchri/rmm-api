import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateMemorialResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateMemorialResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}