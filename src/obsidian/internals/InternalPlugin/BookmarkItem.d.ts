/** @public */
export interface BookmarkItem {
    title: string;
    type: 'file' | 'folder' | 'search';
    subpath: string;
    query: string;
}

