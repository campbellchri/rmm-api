import { ApiProperty } from '@nestjs/swagger';
import { IPublic } from 'src/common/utils/public.type';

export class ResetPasswordResponseDto {
    static fromModel(model: { message: string; userId: string }): IPublic<ResetPasswordResponseDto> {
        return {
            message: model.message,
            userId: model.userId,
        };
    }

    @ApiProperty()
    message: string;

    @ApiProperty()
    userId: string;
}