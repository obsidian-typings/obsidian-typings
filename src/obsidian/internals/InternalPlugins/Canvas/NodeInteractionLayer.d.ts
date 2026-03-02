import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * Layer that handles user interactions with canvas nodes, such as resizing and connecting.
 * @public
 * @unofficial
 */
export interface NodeInteractionLayer {
    /** Reference to the parent canvas instance. */
    canvas: CanvasViewCanvas;

    /** HTML element used for rendering interaction handles. */
    interactionEl: HTMLDivElement;

    /** Currently targeted node for interaction, or null if none. */
    target: null;

    /** Render the interaction handles for the current target node. */
    render(): unknown;

    /** Set the target node for interaction. */
    setTarget(arg1: unknown): unknown;
}
