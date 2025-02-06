import type { BookmarkItem } from './BookmarkItem.js';

/** @public */
export interface FolderBookmarkItem extends BookmarkItem {
    path: string;
    type: 'folder';
}
