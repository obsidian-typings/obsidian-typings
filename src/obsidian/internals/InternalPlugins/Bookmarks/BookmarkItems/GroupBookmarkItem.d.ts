import type { BookmarkItem } from './BookmarkItem.js';

/** @public */
export interface GroupBookmarkItem extends BookmarkItem {
    items: BookmarkItem[];
    title: string;
    type: 'group';
}
