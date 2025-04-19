import type { EditableFileView } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/** @public @unofficial */
export interface VideoView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Video;
}
