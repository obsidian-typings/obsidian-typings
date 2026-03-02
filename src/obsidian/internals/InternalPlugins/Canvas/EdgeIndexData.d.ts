import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvasEdge } from './CanvasViewCanvasEdge.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface EdgeIndexData extends BBox {
    /** @todo Documentation incomplete. */
    children: CanvasViewCanvasEdge[];

    /** @todo Documentation incomplete. */
    height: number;

    /** @todo Documentation incomplete. */
    leaf: boolean;
}
