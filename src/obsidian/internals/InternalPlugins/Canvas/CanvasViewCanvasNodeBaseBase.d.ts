import type { CanvasViewCanvasNodeBaseBaseBase } from './CanvasViewCanvasNodeBaseBaseBase.d.ts';

/**
 * Intermediate base interface for canvas nodes, adding lifecycle and content mounting methods.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNodeBaseBase extends CanvasViewCanvasNodeBaseBaseBase {
    /** Attach the node to the canvas DOM. */
    attach(): unknown;

    /** Detach the node from the canvas DOM. */
    detach(): unknown;

    /** Initialize the node after construction. */
    initialize(): unknown;

    /** Mount the node's content into the content container. */
    mountContent(): unknown;

    /** Perform cleanup before detaching the node. */
    preDetach(): unknown;

    /** Unmount the node's content from the content container. */
    unmountContent(): unknown;

    /** Update the rendering breakpoint based on the node's current size. */
    updateBreakpoint(arg1: unknown): unknown;
}
