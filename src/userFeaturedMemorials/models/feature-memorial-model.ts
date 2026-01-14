import { IPublic } from '../../common/utils/public.type';
import { FeatureMemorialRequestDto } from '../dtos/request/feature-memorial-request.dto';

export class FeatureMemorialModel {
    static fromDto(dto: FeatureMemorialRequestDto, userId: string): IPublic<FeatureMemorialModel> {
        return {
            userId,
            memorialId: dto.memorialId,
        };
    }

    userId: string;
    memorialId: string;
}
