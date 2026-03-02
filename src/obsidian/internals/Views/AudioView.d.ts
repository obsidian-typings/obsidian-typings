import type { EditableFileView } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * View for rendering and playing audio files.
 * @public
 * @unofficial
 */
export interface AudioView extends EditableFileView {
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Audio;
}
