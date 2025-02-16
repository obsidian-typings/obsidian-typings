import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { TagPanePlugin } from './TagPanePlugin.d.ts';

/** @public */
export interface TagPanePluginInstance extends InternalPluginInstance<TagPanePlugin> {
    app: App;
    defaultOn: true;
    plugin: TagPanePlugin;
}
