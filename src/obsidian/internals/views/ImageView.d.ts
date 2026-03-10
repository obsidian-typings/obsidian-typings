import type { EditableFileView } from 'obsidian';

import type { ViewType } from '../../implementations/constants/ViewType.d.ts';

/**
 * View for displaying image files.
 * @public
 * @unofficial
 */
export interface ImageView extends EditableFileView {
  /**
   * Get the current view type.
   *
   * @returns The view type identifier.
   */
  getViewType(): typeof ViewType.Image;
}
