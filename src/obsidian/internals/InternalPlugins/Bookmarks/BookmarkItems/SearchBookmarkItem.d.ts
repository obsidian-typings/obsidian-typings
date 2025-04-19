import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public @unofficial */
export interface SearchBookmarkItem extends BookmarkItem {
    query: string;
    type: 'search';
}
