import { IPublic } from '../../common/utils/public.type';
import { UpdateLegalDocumentRequestDto } from '../dtos/request/update-legal-document-request.dto';

export class UpdateLegalDocumentModel {
    static fromDto(dto: UpdateLegalDocumentRequestDto, id: string): IPublic<UpdateLegalDocumentModel> {
        return {
            id,
            content: dto.content,
            effectiveDate: dto.effectiveDate,
        };
    }

    id: string;
    content?: string;
    effectiveDate?: Date;
}
