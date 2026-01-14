import { ObjectValues } from '../../common/utils/object-values.type';

export const MESSAGE_TYPES = {
    COMPLAINT: 'complaint',
    SUGGESTION: 'suggestion',
    MESSAGE: 'message',
} as const;

export type MessageTypes = ObjectValues<typeof MESSAGE_TYPES>;
