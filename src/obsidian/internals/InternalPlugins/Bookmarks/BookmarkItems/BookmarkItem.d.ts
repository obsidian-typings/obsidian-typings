/** @public @unofficial */
export interface BookmarkItem {
    ctime: number;
    type: 'file' | 'folder' | 'group' | 'graph' | 'search' | 'url';
}
