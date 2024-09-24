import type { App } from 'obsidian';
import type { GraphPlugin } from './GraphPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface GraphPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
    plugin: GraphPlugin;
}
