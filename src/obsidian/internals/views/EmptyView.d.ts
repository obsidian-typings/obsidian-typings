import type { ItemView } from 'obsidian';

import type { ViewType } from '../../implementations/constants/ViewType.d.ts';

/**
 * View displayed when a workspace leaf has no content or file open.
 *
 * @public
 * @unofficial
 */
export interface EmptyView extends ItemView {
  /** Container for the new-tab actions. */
  actionListEl: HTMLDivElement;

  /** Interactive empty-state container. */
  clickableAreaEl: HTMLDivElement;

  /** Outer empty-state container. */
  emptyStateEl: HTMLDivElement;

  /** Empty-state title element. */
  emptyTitleEl: HTMLDivElement;

  /**
   * Get the current view type.
   *
   * @returns The view type identifier.
   */
  getViewType(): typeof ViewType.Empty;

  /**
   * Rebuild the new-tab actions in {@link EmptyView.actionListEl}: new note, and new base, new canvas, go to file
   * and open web viewer where the plugin or vault allows them. Runs on open and whenever an internal plugin changes.
   */
  updateActions(): void;
}
