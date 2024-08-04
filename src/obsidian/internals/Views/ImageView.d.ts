import type { EditableFileView } from "obsidian";

export interface ImageView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): "image";
}
