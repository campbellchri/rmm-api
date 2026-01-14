import { IPublic } from '../../common/utils/public.type';
import { UpdateMemorialQRCodeRequestDto } from '../dtos/request/update-memorial-qr-code-request.dto';

export class UpdateMemorialQRCodeModel {
    static fromDto(dto: UpdateMemorialQRCodeRequestDto, id: string): IPublic<UpdateMemorialQRCodeModel> {
        return {
            id,
            qrCodeData: dto.qrCodeData,
            qrCodeImageURL: dto.qrCodeImageURL,
            qrCodeImageId: dto.qrCodeImageId,
            description: dto.description,
        };
    }

    id: string;
    qrCodeData?: string;
    qrCodeImageURL?: string;
    qrCodeImageId?: string;
    description?: string;
}
