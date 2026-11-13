import type {
  View,
  WorkspaceLeaf
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { Tree } from '../../tree/Tree.d.ts';
import type { TreeItem } from '../../tree/TreeItem.d.ts';
import type { SyncFileTreeItem } from './SyncFileTreeItem.d.ts';
import type { SyncPluginInstance } from './SyncPluginInstance.d.ts';

/**
 * {@link obsidian#View} that displays the Obsidian Sync status and settings.
 *
 * @public
 * @unofficial
 */
export interface SyncView extends View {
  /** The file rows built so far, keyed by vault path. */
  fileItems: Record<string, SyncFileTreeItem>;

  /** The tree of recent changes, grouped by day. */
  tree: Tree<TreeItem>;

  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param syncPluginInstance - The sync plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__?(leaf: WorkspaceLeaf, syncPluginInstance: SyncPluginInstance): this;

  /**
   * Get the current view type.
   *
   * @returns The sync view type.
   */
  getViewType(): typeof ViewType.Sync;

  /**
   * Rebuild the list of recent changes from the server file records.
   *
   * @returns A promise that resolves when the list is rebuilt.
   */
  updateRecentChanges(): Promise<void>;
}
