import type { ItemView } from 'obsidian';

import type { ViewType } from '../../implementations/constants/ViewType.d.ts';

/**
 * View for displaying Obsidian release notes.
 * @public
 * @unofficial
 */
export interface ReleaseNotesView extends ItemView {
  /**
   * Get the release notes from GitHub.
   *
   * @param version - The version of the release notes.
   * @returns The fetched release notes.
   */
  fetchReleaseNotes(version: string): Promise<unknown>;

  /**
   * Get the current view type.
   *
   * @returns The view type identifier.
   */
  getViewType(): typeof ViewType.ReleaseNotes;

  /**
   * Renders the release notes.
   *
   * @returns The result of the rendering operation.
   */
  render(): Promise<unknown>;

  /**
   * Display the patch notes for a specific version.
   *
   * @param e - The event or trigger.
   * @param version - The version to display patch notes for.
   * @returns The result of rendering the patch notes.
   */
  showPatchNotes(e: unknown, version: string): Promise<unknown>;
}
