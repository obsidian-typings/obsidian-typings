import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WorkspacesPlugin } from './WorkspacesPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface WorkspacesPluginInstance extends InternalPluginInstance<WorkspacesPlugin> {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    plugin: WorkspacesPlugin;
}
