import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public */
export interface GroupBookmarkItem extends BookmarkItem {
    items: BookmarkItem[];
    title: string;
    type: 'group';
}
