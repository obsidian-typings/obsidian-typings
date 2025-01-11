import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { GraphPlugin } from './GraphPlugin.js';
import type { GraphPluginInstanceOptions } from './GraphPluginInstanceOptions.js';

/** @public */
export interface GraphPluginInstance extends InternalPluginInstance<GraphPlugin> {
    app: App;
    defaultOn: true;
    /** @internal */
    options: GraphPluginInstanceOptions;
    plugin: GraphPlugin;

    onExternalSettingsChange(): unknown;
    onFileMenu(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;
    openGraphView(arg1: unknown): unknown;
    openLocalGraph(arg1: unknown): unknown;
    /**
     * Saves the options in graph.json
     * @internal
     */
    saveOptions(): void;
}
