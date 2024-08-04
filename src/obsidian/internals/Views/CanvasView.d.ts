import type { TextFileView } from "obsidian";

/** @todo Documentation incomplete */
/** @public */
export interface CanvasView extends TextFileView {
    /**
     * Get the current view type
     */
    getViewType(): "canvas";
    /**
     * Loads the local data of the canvas
     */
    getLocalData(): unknown;
    /**
     * Saves the local data of the canvas
     */
    saveLocalData(): void;
}
