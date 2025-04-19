import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PropertiesPlugin } from './PropertiesPlugin.d.ts';

/** @public @unofficial */
export interface PropertiesPluginInstance extends InternalPluginInstance<PropertiesPlugin> {
    app: App;
    defaultOn: false;
    plugin: PropertiesPlugin;
}
