import type {
  ItemView,
  WorkspaceLeaf
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';

/**
 * View that displays the web browser browsing history.
 * @public
 * @unofficial
 */
export interface WebviewerHistoryView extends ItemView {
  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param browserPluginInstance - The webviewer plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__(leaf: WorkspaceLeaf, browserPluginInstance: WebviewerPluginInstance): this;

  /**
   * Get the current view type.
   *
   * @returns The webviewer history view type.
   */
  getViewType(): typeof ViewType.WebviewerHistory;

  /**
   * Refresh the browsing history list.
   *
   * @returns The result of refreshing the history.
   */
  update(): Promise<unknown>;
}
