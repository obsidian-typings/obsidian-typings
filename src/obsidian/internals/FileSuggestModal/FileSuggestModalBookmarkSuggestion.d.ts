import type { SearchResult } from 'obsidian';

import type { BookmarkItem } from '../internal-plugins/bookmarks/bookmark-items/BookmarkItem.d.ts';
import type { FileSuggestModal } from './FileSuggestModal.d.ts';

/**
 * A bookmark suggestion offered by a {@link FileSuggestModal} while the bookmarks plugin is enabled.
 *
 * @public
 * @unofficial
 */
export interface FileSuggestModalBookmarkSuggestion {
  /**
   * The bookmark's path in the bookmarks tree: the titles of its enclosing groups followed by its own title.
   */
  bookmarkPath: string;

  /**
   * The suggested bookmark.
   */
  item: BookmarkItem;

  /**
   * The fuzzy match of the query against {@link FileSuggestModalBookmarkSuggestion.bookmarkPath}.
   */
  match: SearchResult;

  /**
   * The suggestion type.
   */
  type: 'bookmark';
}
