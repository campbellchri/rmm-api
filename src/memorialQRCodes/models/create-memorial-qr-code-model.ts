import { IPublic } from '../../common/utils/public.type';
import { CreateMemorialQRCodeRequestDto } from '../dtos/request/create-memorial-qr-code-request.dto';

export class CreateMemorialQRCodeModel {
    static fromDto(dto: CreateMemorialQRCodeRequestDto): IPublic<CreateMemorialQRCodeModel> {
        return {
            memorialId: dto.memorialId,
            qrCodeData: dto.qrCodeData,
            qrCodeImageURL: dto.qrCodeImageURL,
            qrCodeImageId: dto.qrCodeImageId,
            description: dto.description,
        };
    }

    memorialId: string;
    qrCodeData?: string;
    qrCodeImageURL?: string;
    qrCodeImageId?: string;
    description?: string;
}
