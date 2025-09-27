/**
 * A bookmark item in the bookmarks plugin.
 *
 * @public
 * @unofficial
 */
export interface BookmarkItem {
    /**
     * The creation time of the bookmark item.
     */
    ctime: number;

    /**
     * The items of the bookmark item.
     */
    items?: BookmarkItem[];

    /**
     * The path of the bookmark item.
     */
    path?: string;

    /**
     * The query of the bookmark item.
     */
    query?: string;

    /**
     * The subpath of the bookmark item.
     */
    subpath?: string;

    /**
     * The title of the bookmark item.
     */
    title: string;

    /**
     * The type of the bookmark item.
     */
    type: 'file' | 'folder' | 'group' | 'graph' | 'search' | 'url';

    /**
     * The URL of the bookmark item.
     */
    url?: string;
}
