import type { EditableFileView } from 'obsidian';

/** @public */
export interface AudioView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): 'audio';
}
