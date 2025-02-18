import type {
    HoverPopover,
    TextFileView
} from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { CanvasPluginInstance } from './CanvasPluginInstance.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/** @todo Documentation incomplete */
/** @public */
export interface CanvasView extends TextFileView {
    canvas: CanvasViewCanvas;
    hoverPopover: null | HoverPopover;
    plugin: CanvasPluginInstance;

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
