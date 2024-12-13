import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { TagPanePlugin } from './TagPanePlugin.js';

/** @public */
export interface TagPanePluginInstance extends InternalPluginInstance<TagPanePlugin> {
    app: App;
    defaultOn: boolean;
    plugin: TagPanePlugin;
}
