import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { SyncPlugin } from './SyncPlugin.js';

/** @public */
export interface SyncPluginInstance extends InternalPluginInstance {
    app: App;
    plugin: SyncPlugin;
}
