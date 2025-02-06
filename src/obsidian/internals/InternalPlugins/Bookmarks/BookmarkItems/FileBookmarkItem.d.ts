import type { BookmarkItem } from './BookmarkItem.js';

/** @public */
export interface FileBookmarkItem extends BookmarkItem {
    path: string;
    subpath: string;
    type: 'file';
}
