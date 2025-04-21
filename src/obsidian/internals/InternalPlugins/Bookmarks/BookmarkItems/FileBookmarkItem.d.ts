import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface FileBookmarkItem extends BookmarkItem {
    /** @todo Documentation incomplete. */
    path: string;

    /** @todo Documentation incomplete. */
    subpath: string;

    /** @todo Documentation incomplete. */
    type: 'file';
}
