import { ObjectValues } from '../../common/utils/object-values.type';

export const LANDING_MODES_TYPES = {
    FULL_MODE: 'full-mode',
    EVENT_MODE: 'event-mode',
    VIDEO_ONLY_MODE: 'video-only-mode',
} as const;

export type LandingModeTypes = ObjectValues<typeof LANDING_MODES_TYPES>;