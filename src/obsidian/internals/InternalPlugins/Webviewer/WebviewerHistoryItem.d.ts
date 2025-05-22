/**
 * Description of Webviewer history item.
 *
 * @public
 * @unofficial
 */
export interface WebviewerHistoryItem {
    /**
     * Timestamp when the URL was visited.
     */
    accessTs: number;

    /**
     * Unique ID of history item.
     */
    id: number;

    /**
     * Title of the URL.
     */
    title: string;

    /**
     * Destination URL.
     */
    url: string;
}
