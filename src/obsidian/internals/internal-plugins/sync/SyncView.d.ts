import type {
  View,
  WorkspaceLeaf
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { SyncPluginInstance } from './SyncPluginInstance.d.ts';

/**
 * View that displays the Obsidian Sync status and settings.
 *
 * @public
 * @unofficial
 */
export interface SyncView extends View {
  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param syncPluginInstance - The sync plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__(leaf: WorkspaceLeaf, syncPluginInstance: SyncPluginInstance): this;

  /**
   * Get the current view type.
   *
   * @returns The sync view type.
   */
  getViewType(): typeof ViewType.Sync;
}
