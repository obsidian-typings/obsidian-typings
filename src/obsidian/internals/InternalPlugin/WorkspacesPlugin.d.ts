import type { InternalPlugin } from './InternalPlugin.js';
import type { WorkspacesPluginInstance } from './WorkspacesPluginInstance.js';

/** @public */
export interface WorkspacesPlugin extends InternalPlugin<WorkspacesPluginInstance> {}
