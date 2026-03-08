import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { GraphPluginInstance } from './GraphPluginInstance.d.ts';

/**
 * Internal plugin that provides graph view functionality.
 * @public
 * @unofficial
 */
export interface GraphPlugin extends InternalPlugin<GraphPluginInstance> {}
