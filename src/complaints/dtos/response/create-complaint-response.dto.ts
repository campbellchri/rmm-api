import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintResponseDto {
    @ApiProperty({ example: 'uuid-of-complaint' })
    id: string;

    static fromModel(model: { id: string }): CreateComplaintResponseDto {
        const dto = new CreateComplaintResponseDto();
        dto.id = model.id;
        return dto;
    }
}
