import type { EditableFileView } from 'obsidian';

import type { ViewType } from '../../implementations/constants/ViewType.d.ts';

/**
 * View for rendering and playing video files.
 * @public
 * @unofficial
 */
export interface VideoView extends EditableFileView {
  /**
   * Get the current view type.
   *
   * @returns The view type identifier.
   */
  getViewType(): typeof ViewType.Video;
}
