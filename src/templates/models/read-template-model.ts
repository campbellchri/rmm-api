import { TemplateEntity } from 'src/common/database/templates/entities/templates.entity';
import { IPublic } from '../../common/utils/public.type';
import { LandingModeReadModel } from 'src/landingMode/models/read-landing-mode.model';


export class TemplateReadModel {
    static fromEntity(entity: TemplateEntity): IPublic<TemplateReadModel> {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            landingModeId: entity.landingModeId,
            thumbnailURL: entity.thumbnailURL,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            landingMode: entity.landingMode
                ? LandingModeReadModel.fromEntity(entity.landingMode)
                : undefined,
        };
    }

    static fromEntities(entities: TemplateEntity[]): IPublic<TemplateReadModel>[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    id: string;
    name: string;
    description?: string;
    landingModeId?: string;
    thumbnailURL?: string;
    createdAt: Date;
    updatedAt: Date;
    landingMode?: IPublic<LandingModeReadModel>;
}
