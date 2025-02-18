import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/** @public */
export interface CanvasSelection {
    bbox: BBox;
    canvas: CanvasViewCanvas;
    resizerEls: HTMLDivElement[];
    selectionEl: HTMLDivElement;

    hide(): unknown;
    onResizePointerdown(arg1: unknown, arg2: unknown): unknown;
    update(arg1: unknown): unknown;
}
