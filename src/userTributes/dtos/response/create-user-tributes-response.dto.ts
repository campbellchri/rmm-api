import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateUserTributesResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateUserTributesResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}