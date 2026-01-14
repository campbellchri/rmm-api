import { ObjectValues } from '../../common/utils/object-values.type';

export const GENDERS = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
    PREFER_NOT_TO_SAY: 'prefer_not_to_say',
} as const;

export type Genders = ObjectValues<typeof GENDERS>;
