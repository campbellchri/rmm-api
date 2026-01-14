import { ApiProperty } from '@nestjs/swagger';

export class CreateContactUsResponseDto {
    @ApiProperty({ example: 'uuid-of-contact-us' })
    id: string;

    static fromModel(model: { id: string }): CreateContactUsResponseDto {
        const dto = new CreateContactUsResponseDto();
        dto.id = model.id;
        return dto;
    }
}
