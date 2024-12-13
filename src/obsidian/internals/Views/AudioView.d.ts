import type { EditableFileView } from 'obsidian';
import type { ViewType } from '../../implementations/ViewType.ts';

/** @public */
export interface AudioView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Audio;
}
