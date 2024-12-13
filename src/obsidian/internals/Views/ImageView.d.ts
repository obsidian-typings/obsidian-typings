import type { EditableFileView } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.js';

/** @public */
export interface ImageView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Image;
}
