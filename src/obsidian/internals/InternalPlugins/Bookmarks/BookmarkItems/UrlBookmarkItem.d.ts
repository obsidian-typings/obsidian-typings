import type { BookmarkItem } from './BookmarkItem.js';

/** @public */
export interface UrlBookmarkItem extends BookmarkItem {
    title: string;
    type: 'url';
    url: string;
}
