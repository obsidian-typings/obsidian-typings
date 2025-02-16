import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { GraphPluginInstance } from './GraphPluginInstance.d.ts';

/** @public */
export interface GraphPlugin extends InternalPlugin<GraphPluginInstance> {}
