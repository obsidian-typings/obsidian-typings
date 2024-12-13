import type { InternalPlugin } from '../InternalPlugin.js';
import type { GraphPluginInstance } from './GraphPluginInstance.js';

/** @public */
export interface GraphPlugin extends InternalPlugin<GraphPluginInstance> {}
