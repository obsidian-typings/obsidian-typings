import type { BookmarkItem } from './BookmarkItem.d.ts';

/** @public @unofficial */
export interface FileBookmarkItem extends BookmarkItem {
    path: string;
    subpath: string;
    type: 'file';
}
