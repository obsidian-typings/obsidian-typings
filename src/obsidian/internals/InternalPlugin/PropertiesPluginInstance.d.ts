import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { PropertiesPlugin } from './PropertiesPlugin.js';

/** @public */
export interface PropertiesPluginInstance extends InternalPluginInstance<PropertiesPlugin> {
    app: App;
    defaultOn: boolean;
    plugin: PropertiesPlugin;
}
