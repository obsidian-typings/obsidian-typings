import type { TextFileView } from "obsidian";
/** @todo Documentation incomplete */
export interface CanvasView extends TextFileView {
    /**
     * Get the current view type
     */
    getViewType(): "canvas";
    getLocalData(): unknown;
    saveLocalData(): void;
}
