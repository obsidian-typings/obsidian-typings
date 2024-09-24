import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { PropertiesPlugin } from './PropertiesPlugin.js';

/** @public */
export interface PropertiesPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    plugin: PropertiesPlugin;
    app: App;
}
