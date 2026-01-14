import { ObjectValues } from '../../common/utils/object-values.type';

export const MEDIA_TYPES = {
    PHOTO: 'photo',
    VIDEO: 'video',
    DOCUMENT: 'document',
    AUDIO: 'audio',
} as const;

export type MediaTypes = ObjectValues<typeof MEDIA_TYPES>;
