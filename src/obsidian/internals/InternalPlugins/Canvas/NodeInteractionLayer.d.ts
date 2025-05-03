import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface NodeInteractionLayer {
    /** @todo Documentation incomplete. */
    canvas: CanvasViewCanvas;

    /** @todo Documentation incomplete. */
    interactionEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    target: null;

    /** @todo Documentation incomplete. */
    render(): unknown;

    /** @todo Documentation incomplete. */
    setTarget(arg1: unknown): unknown;
}
