import type { App } from 'obsidian';
import type { WebviewerHistoryItem } from './WebviewerHistoryItem.d.ts';

/**
 * Stores and manages all history items and cached fav icons.
 *
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface WebviewerDBStore {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Underlying database used to store history items and fav icons via IndexedDB.
     *
     * @remark Use methods such as `addHistoryItem` etc. to interact with the stored history.
     */
    db: IDBDatabase;

    /**
     * Add a history item to the database.
     */
    addHistoryItem(url: string, title?: string): Promise<void>;

    /**
     * Clear all history items.
     */
    clearHistoryItems(): Promise<void>;

    /** @todo Documentation incomplete */
    connect(): Promise<void>;

    /**
     * Get all history items.
     */
    getHistoryItems(): Promise<WebviewerHistoryItem[]>;

    /**
     * Load stored icon in Base64 encoded string. If no stored icon available in the database,
     * it also stores the icon.
     *
     * @param domain - Domain name only, e.g. "obsidian.md".
     * @param source - Source url of the icon, e.g. "https://obsidian.md/favicon.ico".
     * Used as a fallback source if there is no icon stored with corresponding domain.
     * @returns Icon in Base64 encoded string.
     */
    loadIcon(domain: string, source?: string): Promise<string | null>;

    /**
     * Remove specific history item based on its {@link WebviewerHistoryItem.id | id}.
     */
    removeHistoryItem(item: WebviewerHistoryItem): Promise<void>;

    /**
     * Add a fav icon to the element.
     */
    setIcon(el: HTMLElement, url: string, source?: string): Promise<void>;

    /**
     * Store specific icon for the given domain name in Base64 string.
     *
     * @param domain - Domain name only, e.g. "obsidian.md".
     * @param source - Source url of the icon, e.g. "https://obsidian.md/favicon.ico".
     * @returns Icon in Base64 encoded string.
     */
    storeIcon(domain: string, source?: string): Promise<string | null>;
}
