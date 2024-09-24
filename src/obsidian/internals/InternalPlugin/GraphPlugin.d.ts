import type { GraphPluginInstance } from './GraphPluginInstance.js';
import type { InternalPlugin } from './InternalPlugin.js';

/** @public */
export interface GraphPlugin extends InternalPlugin<GraphPluginInstance> {}
