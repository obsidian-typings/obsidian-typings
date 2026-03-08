import type { PaneType } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WebviewerDBStore } from './WebviewerDBStore.d.ts';
import type { WebviewerOpenUrlEventDetail } from './WebviewerOpenUrlEventDetail.d.ts';
import type { WebviewerPlugin } from './WebviewerPlugin.d.ts';

/**
 * Plugin instance for the web viewer, providing an embedded web browser within Obsidian.
 * @public
 * @unofficial
 */
export interface WebviewerPluginInstance extends InternalPluginInstance<WebviewerPlugin> {
    /**
     * Stored history items and cached fav icons.
     */
    db: WebviewerDBStore;

    /** Whether this plugin is enabled by default. */
    defaultOn: false;

    /**
     * Build a search engine URL for the given search query.
     *
     * @param searchQuery - The search query to build a URL for.
     * @returns The search engine URL.
     */
    getSearchEngineUrl(searchQuery: string): string;

    /**
     * Handle a custom open URL event from the webview.
     *
     * @param event - The custom event containing the URL details.
     */
    handleOpenUrl(event: CustomEvent<WebviewerOpenUrlEventDetail>): void;

    /**
     * Open a URL in the web viewer.
     *
     * @param url - The URL to open.
     * @param newLeaf - The pane type or whether to open in a new leaf.
     * @param active - Whether to make the new leaf active.
     */
    openUrl(url: string, newLeaf?: PaneType | boolean, active?: boolean): void;

    /**
     * Open a URL in the system default browser.
     *
     * @param url - The URL to open externally.
     */
    openUrlExternally(url: string): void;

    /** URLs that are pending to be added to the ignore list. */
    pendingIgnoredURLs: string[];

    /** Update the current browsing session state. */
    updateSession(): void;
}
