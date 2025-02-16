import type { WorkspaceLeaf } from 'obsidian';
import type { SyncPluginInstance } from '../../InternalPlugins/Sync/SyncPluginInstance.d.ts';
import type { SyncView } from '../../InternalPlugins/Sync/SyncView.d.ts';

/**
 * A constructor for a sync view.
 *
 * @public
 */
export type SyncViewConstructor = new(
    leaf: WorkspaceLeaf,
    syncPluginInstance: SyncPluginInstance
) => SyncView;
