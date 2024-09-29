import type {
    App,
    Debouncer,
    Events
} from 'obsidian';
import type { BookmarksPlugin } from './BookmarksPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin>, Events {
    app: App;
    defaultOn: boolean;
    plugin: BookmarksPlugin;

    bookmarkedViews: Map<unknown, unknown>;
    bookmarkLookup: Object;
    description: string;
    hasValidData: boolean;
    id: string;
    items: unknown[];
    name: string;
    urlBookmarkLookup: Object;
    onItemsChanged: Debouncer<[], unknown>;
}
