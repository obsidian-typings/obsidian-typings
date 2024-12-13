import type { TextFileView } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.js';

/** @todo Documentation incomplete */
/** @public */
export interface CanvasView extends TextFileView {
    /**
     * Loads the local data of the canvas
     */
    getLocalData(): unknown;
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Canvas;
    /**
     * Saves the local data of the canvas
     */
    saveLocalData(): void;
}
