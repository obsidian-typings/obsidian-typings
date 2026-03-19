import type { BookmarkItem } from './BookmarkItem.d.ts';

/**
 * Bookmark item representing a bookmarked URL.
 *
 * @public
 * @unofficial
 */
export interface UrlBookmarkItem extends BookmarkItem {
  /** Display title of this URL bookmark. */
  title: string;

  /** Discriminator indicating this is a URL bookmark. */
  type: 'url';

  /** The bookmarked URL. */
  url: string;
}
