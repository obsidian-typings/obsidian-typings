import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WorkspacesPlugin } from './WorkspacesPlugin.d.ts';

/** @public @unofficial */
export interface WorkspacesPluginInstance extends InternalPluginInstance<WorkspacesPlugin> {
    app: App;
    plugin: WorkspacesPlugin;
}
