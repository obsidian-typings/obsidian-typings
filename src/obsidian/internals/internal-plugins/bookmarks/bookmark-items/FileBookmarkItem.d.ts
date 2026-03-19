import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * Bookmark item representing a bookmarked file.
 *
 * @public
 * @unofficial
 */
export interface FileBookmarkItem extends BookmarkItem {
  /** Vault-relative path to the bookmarked file. */
  path: string;

  /** Subpath within the file (e.g. heading or block reference). */
  subpath: string;

  /** Discriminator indicating this is a file bookmark. */
  type: 'file';
}
