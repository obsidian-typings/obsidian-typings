import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface UrlBookmarkItem extends BookmarkItem {
    title: string;
    type: 'url';
    url: string;
}
