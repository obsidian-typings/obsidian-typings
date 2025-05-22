import type { PaneType } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WebviewerDBStore } from './WebviewerDBStore.d.ts';
import type { WebviewerPlugin } from './WebviewerPlugin.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface WebviewerPluginInstance extends InternalPluginInstance<WebviewerPlugin> {
    /**
     * Stored history items and cached fav icons.
     */
    db: WebviewerDBStore;

    /** @todo Documentation incomplete. */
    defaultOn: false;

    /** @todo Documentation incomplete. */
    pendingIgnoredURLs: string[];

    /** @todo Documentation incomplete. */
    getSearchEngineUrl(searchQuery: string): string;

    /** @todo Documentation incomplete. */
    handleOpenUrl(event: CustomEvent<{ url: string; newLeaf?: PaneType | boolean; active?: boolean }>): void;

    /** @todo Documentation incomplete. */
    openUrl(url: string, newLeaf?: PaneType | boolean, active?: boolean): void;

    /** @todo Documentation incomplete. */
    openUrlExternally(url: string): void;

    /** @todo Documentation incomplete. */
    updateSession(): void;
}
