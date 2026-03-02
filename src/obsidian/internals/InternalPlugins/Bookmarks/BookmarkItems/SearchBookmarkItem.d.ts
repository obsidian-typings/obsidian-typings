import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * Bookmark item representing a saved search query.
 * @public
 * @unofficial
 */
export interface SearchBookmarkItem extends BookmarkItem {
    /** The saved search query string. */
    query: string;

    /** Discriminator indicating this is a search bookmark. */
    type: 'search';
}
