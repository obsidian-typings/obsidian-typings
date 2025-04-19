import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public @unofficial */
export interface FolderBookmarkItem extends BookmarkItem {
    path: string;
    type: 'folder';
}
