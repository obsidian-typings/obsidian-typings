import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SyncPlugin } from './SyncPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SyncPluginInstance extends InternalPluginInstance<SyncPlugin> {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    plugin: SyncPlugin;
}
