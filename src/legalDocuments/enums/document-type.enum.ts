import { ObjectValues } from '../../common/utils/object-values.type';

export const DOCUMENT_TYPES = {
    PRIVACY_POLICY: 'privacy_policy',
    TERMS_AND_CONDITIONS: 'terms_and_conditions',
} as const;

export type DocumentTypes = ObjectValues<typeof DOCUMENT_TYPES>;
