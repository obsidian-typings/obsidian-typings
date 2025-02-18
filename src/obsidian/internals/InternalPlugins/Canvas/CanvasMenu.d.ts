import type { CanvasSelection } from './CanvasSelection.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/** @public */
export interface CanvasMenu {
    canvas: CanvasViewCanvas;
    containerEl: HTMLDivElement;
    menuEl: HTMLDivElement;
    selection: CanvasSelection;

    render(arg1: unknown): unknown;
    updateZIndex(arg1: unknown): unknown;
}
