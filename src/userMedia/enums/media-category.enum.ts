import { ObjectValues } from '../../common/utils/object-values.type';

export const MEDIA_CATEGORIES = {
    PROFILE: 'profile',
    FEATURED: 'featured',
    GALLERY: 'gallery',
    LIFE_STORY_IMAGE: 'life_story_image',
} as const;

export type MediaCategories = ObjectValues<typeof MEDIA_CATEGORIES>;
