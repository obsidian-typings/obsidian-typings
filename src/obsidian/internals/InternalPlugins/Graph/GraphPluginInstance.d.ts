import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { GraphPlugin } from './GraphPlugin.js';
import type { GraphPluginInstanceOptions } from './GraphPluginInstanceOptions.js';

/** @public */
export interface GraphPluginInstance extends InternalPluginInstance<GraphPlugin> {
    /**
     * Saves the options in graph.json
     * @internal
     */
    saveOptions(): void;
    
    app: App;
    defaultOn: true;
    /** @internal */
    options: GraphPluginInstanceOptions;
    plugin: GraphPlugin;
}
