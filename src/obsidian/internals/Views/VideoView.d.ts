import type { EditableFileView } from 'obsidian';

/** @public */
export interface VideoView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): 'video';
}
