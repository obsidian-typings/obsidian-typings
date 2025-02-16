import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public */
export interface UrlBookmarkItem extends BookmarkItem {
    title: string;
    type: 'url';
    url: string;
}
