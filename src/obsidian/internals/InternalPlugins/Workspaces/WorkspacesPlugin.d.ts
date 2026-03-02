import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { WorkspacesPluginInstance } from './WorkspacesPluginInstance.d.ts';

/**
 * Internal plugin registration for the workspaces (layout saving/loading) feature.
 * @public
 * @unofficial
 */
export interface WorkspacesPlugin extends InternalPlugin<WorkspacesPluginInstance> {}
