import type { CanvasViewCanvasNodeUnknownData } from './CanvasViewCanvasNodeUnknownData.d.ts';

/**
 * Serialized data for a canvas node.
 * @public
 * @unofficial
 */
export interface CanvasViewDataNode extends CanvasViewCanvasNodeUnknownData {
    /** Height of the node in pixels. */
    height: number;

    /** Subpath within the file (e.g. heading or block reference). */
    subpath?: unknown;

    /** Width of the node in pixels. */
    width: number;

    /** X position of the node on the canvas. */
    x: number;

    /** Y position of the node on the canvas. */
    y: number;
}
