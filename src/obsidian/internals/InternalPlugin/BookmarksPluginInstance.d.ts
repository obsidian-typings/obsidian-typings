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
    bookmarkedViews: Map<unknown, unknown>;
    bookmarkLookup: Object;
    defaultOn: boolean;
    description: string;
    hasValidData: boolean;
    id: string;
    items: unknown[];
    name: string;
    onItemsChanged: Debouncer<[], unknown>;
    plugin: BookmarksPlugin;
    urlBookmarkLookup: Object;
}
