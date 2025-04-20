/**
 * @public
 * @unofficial
 */
export interface BookmarkItem {
    /**
     * @todo Documentation incomplete.
     */
    ctime: number;

    /**
     * @todo Documentation incomplete.
     */
    type: 'file' | 'folder' | 'group' | 'graph' | 'search' | 'url';
}
