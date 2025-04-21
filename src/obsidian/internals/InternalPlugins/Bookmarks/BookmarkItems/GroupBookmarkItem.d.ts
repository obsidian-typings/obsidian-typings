import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GroupBookmarkItem extends BookmarkItem {
    /** @todo Documentation incomplete. */
    items: BookmarkItem[];

    /** @todo Documentation incomplete. */
    title: string;

    /** @todo Documentation incomplete. */
    type: 'group';
}
