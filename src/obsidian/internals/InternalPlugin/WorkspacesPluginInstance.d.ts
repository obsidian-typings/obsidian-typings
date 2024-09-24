import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { WorkspacesPlugin } from './WorkspacesPlugin.js';

/** @public */
export interface WorkspacesPluginInstance extends InternalPluginInstance {
    plugin: WorkspacesPlugin;
    app: App;
}
