import type { BookmarkItem } from './BookmarkItem.js';

/** @public */
export interface SearchBookmarkItem extends BookmarkItem {
    query: string;
    type: 'search';
}
