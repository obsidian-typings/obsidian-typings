import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { TagPanePlugin } from './TagPanePlugin.js';

/** @public */
export interface TagPanePluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    plugin: TagPanePlugin;
    app: App;
}
