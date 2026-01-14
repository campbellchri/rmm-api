import { ObjectValues } from '../../common/utils/object-values.type';

export const STORAGE_UNITS = {
    GB: 'GB',
    TB: 'TB',
} as const;

export type StorageUnits = ObjectValues<typeof STORAGE_UNITS>;
