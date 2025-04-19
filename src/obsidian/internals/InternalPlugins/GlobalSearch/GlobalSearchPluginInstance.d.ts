import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { GlobalSearchPlugin } from './GlobalSearchPlugin.d.ts';

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface GlobalSearchPluginInstance extends InternalPluginInstance<GlobalSearchPlugin> {
    app: App;
    defaultOn: true;
    plugin: GlobalSearchPlugin;
}
