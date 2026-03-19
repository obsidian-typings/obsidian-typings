import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * Bookmark item representing a group that contains other bookmark items.
 *
 * @public
 * @unofficial
 */
export interface GroupBookmarkItem extends BookmarkItem {
  /** Child bookmark items contained in this group. */
  items: BookmarkItem[];

  /** Display title of this bookmark group. */
  title: string;

  /** Discriminator indicating this is a group bookmark. */
  type: 'group';
}
