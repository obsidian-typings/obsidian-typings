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

    /**
     * Render the interaction handles for the current target node.
     *
     * @returns The result of rendering the interaction handles.
     */
    render(): unknown;

    /**
     * Set the target node for interaction.
     *
     * @returns The result of setting the target.
     */
    setTarget(arg1: unknown): unknown;

    /** Currently targeted node for interaction, or `null` if none. */
    target: null;
}
