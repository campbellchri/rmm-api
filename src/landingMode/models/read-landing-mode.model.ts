import { LandingModeEntity } from "src/common/database/landingMode/entities/landing-mode.entity";
import { IPublic } from 'src/common/utils/public.type';
import { LandingModeTypes } from "../enums/landing-mode.enum";


export class LandingModeReadModel {
    id: string;
    title: string;
    description?: string;
    iconId?: string;
    iconURL?: string;
    isActive: boolean;
    landingModeType: LandingModeTypes
    createdAt: Date;
    updatedAt: Date;

    static fromEntity(entity: LandingModeEntity): IPublic<LandingModeReadModel> {
        const model = new LandingModeReadModel();
        model.id = entity.id;
        model.title = entity.title;
        model.description = entity?.description;
        model.iconId = entity?.iconId;
        model.iconURL = entity?.iconURL;
        model.isActive = entity?.isActive;
        model.landingModeType = entity?.landingModeType;
        model.createdAt = entity?.createdAt;
        model.updatedAt = entity?.updatedAt;
        return model;
    }

    static fromEntities(entities: LandingModeEntity[]): IPublic<LandingModeReadModel[]> {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
