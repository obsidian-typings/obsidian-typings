import type { TreeItem } from '../../../tree/TreeItem.d.ts';
import type { BookmarkItem } from '../bookmark-items/BookmarkItem.d.ts';
import type { BookmarksView } from './BookmarksView.d.ts';

/**
 * Common row surface shared by bookmark entries and bookmark groups.
 *
 * @public
 * @unofficial
 */
export interface BookmarkTreeItem extends TreeItem {
  /** Bookmark data represented by this row. */
  item: BookmarkItem;

  /** Editable title element. */
  titleEl: HTMLSpanElement;

  /** Owning bookmarks view. */
  view: BookmarksView;

  /**
   * Begin editing the bookmark title.
   */
  startRename(): void;

  /**
   * Refresh the bookmark title and visual state.
   */
  update(): void;
}
