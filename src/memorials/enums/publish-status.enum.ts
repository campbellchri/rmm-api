import { ObjectValues } from '../../common/utils/object-values.type';

export const PUBLISH_STATUSES = {
    DRAFT: 'draft',
    STANDARD: 'standard',
    PRIVATE: 'private',
    ARCHIVED: 'archived',
} as const;

export type PublishStatuses = ObjectValues<typeof PUBLISH_STATUSES>;
