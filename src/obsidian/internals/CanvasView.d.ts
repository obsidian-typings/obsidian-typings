import type { TextFileView } from "obsidian";
/** @todo Documentation incomplete */
export interface CanvasView extends TextFileView {
    /**
     * Get the current view type
     * @returns "canvas"
     */
    getViewType(): string;
    getLocalData(): unknown;
    saveLocalData(): void;
}
