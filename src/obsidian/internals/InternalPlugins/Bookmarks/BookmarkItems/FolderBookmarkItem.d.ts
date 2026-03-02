import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * Bookmark item representing a bookmarked folder.
 * @public
 * @unofficial
 */
export interface FolderBookmarkItem extends BookmarkItem {
    /** Vault-relative path to the bookmarked folder. */
    path: string;

    /** Discriminator indicating this is a folder bookmark. */
    type: 'folder';
}
