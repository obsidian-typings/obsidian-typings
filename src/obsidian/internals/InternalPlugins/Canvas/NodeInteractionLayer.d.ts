import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/** @public */
export interface NodeInteractionLayer {
    canvas: CanvasViewCanvas;
    interactionEl: HTMLDivElement;
    target: null;

    render(): unknown;
    setTarget(arg1: unknown): unknown;
}
