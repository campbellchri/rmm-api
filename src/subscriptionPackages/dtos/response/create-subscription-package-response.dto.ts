import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionPackageResponseDto {
    @ApiProperty({ example: 'uuid-of-package' })
    id: string;

    static fromModel(model: { id: string }): CreateSubscriptionPackageResponseDto {
        const dto = new CreateSubscriptionPackageResponseDto();
        dto.id = model.id;
        return dto;
    }
}
