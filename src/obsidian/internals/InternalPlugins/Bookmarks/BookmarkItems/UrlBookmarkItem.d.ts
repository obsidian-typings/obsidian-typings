import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface UrlBookmarkItem extends BookmarkItem {
    /** @todo Documentation incomplete. */
    title: string;

    /** @todo Documentation incomplete. */
    type: 'url';

    /** @todo Documentation incomplete. */
    url: string;
}
