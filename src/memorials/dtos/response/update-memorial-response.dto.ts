import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class UpdateMemorialResponseDto {
    static fromModel(model: { id: string }): IPublic<UpdateMemorialResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}