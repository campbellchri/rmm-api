import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubscriptionPackageResponseDto {
    @ApiProperty({ example: 'uuid-of-package' })
    id: string;

    static fromModel(model: { id: string }): UpdateSubscriptionPackageResponseDto {
        const dto = new UpdateSubscriptionPackageResponseDto();
        dto.id = model.id;
        return dto;
    }
}
