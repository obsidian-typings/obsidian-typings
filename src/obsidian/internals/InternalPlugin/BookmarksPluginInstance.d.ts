import type { App } from 'obsidian';
import type { BookmarksPlugin } from './BookmarksPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface BookmarksPluginInstance extends InternalPluginInstance<BookmarksPlugin> {
    app: App;
    defaultOn: boolean;
    plugin: BookmarksPlugin;
}
