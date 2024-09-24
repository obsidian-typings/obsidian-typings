import type { App } from 'obsidian';
import type { BookmarksPlugin } from './BookmarksPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface BookmarksPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: BookmarksPlugin;
}
