import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface FolderBookmarkItem extends BookmarkItem {
    /** @todo Documentation incomplete. */
    path: string;

    /** @todo Documentation incomplete. */
    type: 'folder';
}
