import type { EditableFileView } from "obsidian";

/** @public */
export interface ImageView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): "image";
}
