import type { WorkspaceLeaf } from 'obsidian';
import type { SyncPluginInstance } from '../../InternalPlugins/Sync/SyncPluginInstance.js';
import type { SyncView } from '../../InternalPlugins/Sync/SyncView.js';

/**
 * A constructor for a sync view.
 *
 * @public
 */
export type SyncViewConstructor = new(
    leaf: WorkspaceLeaf,
    syncPluginInstance: SyncPluginInstance
) => SyncView;
