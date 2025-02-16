import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public */
export interface FolderBookmarkItem extends BookmarkItem {
    path: string;
    type: 'folder';
}
