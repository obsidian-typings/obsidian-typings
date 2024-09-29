/** @public */
export interface BookmarkItem {
    query: string;
    subpath: string;
    title: string;
    type: 'file' | 'folder' | 'search';
}
