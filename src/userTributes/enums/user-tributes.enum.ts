import { ObjectValues } from '../../common/utils/object-values.type';

export const USER_TRIBUTE_TYPES = {
    MEMORY: 'memory',
    TRIBUTE: 'tribute',
    CONDOLENCE: 'condolence',
} as const;

export type UserTributeTypes = ObjectValues<typeof USER_TRIBUTE_TYPES>;

