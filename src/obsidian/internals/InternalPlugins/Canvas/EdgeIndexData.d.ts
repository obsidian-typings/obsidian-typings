import type { CanvasViewCanvasEdge } from './CanvasViewCanvasEdge.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface EdgeIndexData {
    /** @todo Documentation incomplete. */
    children: CanvasViewCanvasEdge[];

    /** @todo Documentation incomplete. */
    height: number;

    /** @todo Documentation incomplete. */
    leaf: boolean;

    /** @todo Documentation incomplete. */
    maxX: number;

    /** @todo Documentation incomplete. */
    maxY: number;

    /** @todo Documentation incomplete. */
    minX: number;

    /** @todo Documentation incomplete. */
    minY: number;
}
