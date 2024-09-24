import type { InternalPlugin } from './InternalPlugin.js';
import type { SyncPluginInstance } from './SyncPluginInstance.js';

/** @public */
export interface SyncPlugin extends InternalPlugin<SyncPluginInstance> {}
