import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { SyncPluginInstance } from './SyncPluginInstance.d.ts';

/** @public */
export interface SyncPlugin extends InternalPlugin<SyncPluginInstance> {}
