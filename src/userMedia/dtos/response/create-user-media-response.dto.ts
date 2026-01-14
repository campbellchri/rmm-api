import { ApiProperty } from "@nestjs/swagger";
import { IPublic } from "src/common/utils/public.type";

export class CreateUserMediaResponseDto {
    static fromModel(model: { id: string }): IPublic<CreateUserMediaResponseDto> {
        return { id: model.id };
    }

    @ApiProperty()
    id: string;
}