import { ObjectValues } from '../../common/utils/object-values.type';

export const PRICE_UNITS = {
    MONTH: 'month',
    YEAR: 'year',
} as const;

export type PriceUnits = ObjectValues<typeof PRICE_UNITS>;
