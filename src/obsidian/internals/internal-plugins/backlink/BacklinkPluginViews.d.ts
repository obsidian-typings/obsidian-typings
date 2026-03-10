import type {
  ViewCreator,
  WorkspaceLeaf
} from 'obsidian';

import type { BacklinkView } from './BacklinkView.d.ts';

/**
 * View creators registered by the backlink plugin.
 * @public
 * @unofficial
 */
export interface BacklinkPluginViews extends Record<string, ViewCreator> {
  /**
   * Create a backlink view in the given workspace leaf.
   *
   * @param left - The workspace leaf to create the view in.
   * @returns The created backlink view.
   */
  backlink(left: WorkspaceLeaf): BacklinkView;
}
