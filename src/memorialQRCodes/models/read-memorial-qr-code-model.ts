import { MemorialQRCodeEntity } from 'src/common/database/memorialQRCodes/entities/memorial-qr-code.entity';
import { IPublic } from '../../common/utils/public.type';

export class MemorialQRCodeReadModel {
    static fromEntity(entity: MemorialQRCodeEntity): IPublic<MemorialQRCodeReadModel> {
        return {
            id: entity.id,
            memorialId: entity.memorialId,
            qrCodeData: entity.qrCodeData,
            qrCodeImageURL: entity.qrCodeImageURL,
            qrCodeImageId: entity.qrCodeImageId,
            description: entity.description,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static fromEntities(entities: MemorialQRCodeEntity[]): IPublic<MemorialQRCodeReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    memorialId: string;
    qrCodeData?: string;
    qrCodeImageURL?: string;
    qrCodeImageId?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
