import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { GlobalSearchPlugin } from './GlobalSearchPlugin.js';

/** @todo Documentation incomplete */
/** @public */
export interface GlobalSearchPluginInstance extends InternalPluginInstance<GlobalSearchPlugin> {
    app: App;
    defaultOn: boolean;
    plugin: GlobalSearchPlugin;
}
