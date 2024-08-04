import type { EditableFileView } from "obsidian";

export interface AudioView extends EditableFileView {
    /**
     * Get the current view type
     */
    getViewType(): "audio";
}
