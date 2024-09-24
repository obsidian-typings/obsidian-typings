import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { BookmarksPlugin } from './BookmarksPlugin.js';

/** @public */
export interface BookmarksPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: BookmarksPlugin;
}
