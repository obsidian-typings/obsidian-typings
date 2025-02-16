import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SyncPlugin } from './SyncPlugin.d.ts';

/** @public */
export interface SyncPluginInstance extends InternalPluginInstance<SyncPlugin> {
    app: App;
    plugin: SyncPlugin;
}
