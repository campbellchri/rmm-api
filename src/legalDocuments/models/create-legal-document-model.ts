import { IPublic } from '../../common/utils/public.type';
import { CreateLegalDocumentRequestDto } from '../dtos/request/create-legal-document-request.dto';

export class CreateLegalDocumentModel {
    static fromDto(dto: CreateLegalDocumentRequestDto): IPublic<CreateLegalDocumentModel> {
        return {
            type: dto.type as any,
            content: dto.content,
            effectiveDate: dto.effectiveDate,
        };
    }

    type: string;
    content: string;
    effectiveDate?: Date;
}
