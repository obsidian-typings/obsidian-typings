import type { BBox } from './BBox.d.ts';
import type { Bezier } from './Bezier.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';
import type { CanvasViewCanvasEdgeLineEnd } from './CanvasViewCanvasEdgeLineEnd.d.ts';
import type { CanvasViewCanvasEdgeLink } from './CanvasViewCanvasEdgeLink.d.ts';
import type { CanvasViewCanvasEdgePath } from './CanvasViewCanvasEdgePath.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasEdge {
    /** @todo Documentation incomplete. */
    bbox: BBox;

    /** @todo Documentation incomplete. */
    bezier: Bezier;

    /** @todo Documentation incomplete. */
    canvas: CanvasViewCanvas;

    /** @todo Documentation incomplete. */
    color: string;

    /** @todo Documentation incomplete. */
    from: CanvasViewCanvasEdgeLink;

    /** @todo Documentation incomplete. */
    fromLineEnd: CanvasViewCanvasEdgeLineEnd | null;

    /** @todo Documentation incomplete. */
    id: string;

    /** @todo Documentation incomplete. */
    initialized: boolean;

    /** @todo Documentation incomplete. */
    isAttached?: unknown;

    /** @todo Documentation incomplete. */
    label: string;

    /** @todo Documentation incomplete. */
    lineEndGroupEl: SVGGElement;

    /** @todo Documentation incomplete. */
    lineGroupEl: SVGGElement;

    /** @todo Documentation incomplete. */
    path: CanvasViewCanvasEdgePath;

    /** @todo Documentation incomplete. */
    to: CanvasViewCanvasEdgeLink;

    /** @todo Documentation incomplete. */
    toLineEnd: CanvasViewCanvasEdgeLineEnd | null;

    /** @todo Documentation incomplete. */
    unknownData: Object;

    /** @todo Documentation incomplete. */
    attach(): unknown;

    /** @todo Documentation incomplete. */
    blur(): unknown;

    /** @todo Documentation incomplete. */
    createEdgeEnd(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    deselect(): unknown;

    /** @todo Documentation incomplete. */
    destroy(): unknown;

    /** @todo Documentation incomplete. */
    detach(): unknown;

    /** @todo Documentation incomplete. */
    editLabel(): unknown;

    /** @todo Documentation incomplete. */
    focus(): unknown;

    /** @todo Documentation incomplete. */
    getBBox(): unknown;

    /** @todo Documentation incomplete. */
    getCenter(): unknown;

    /** @todo Documentation incomplete. */
    getData(): unknown;

    /** @todo Documentation incomplete. */
    initialize(): unknown;

    /** @todo Documentation incomplete. */
    onClick(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onConnectionPointerdown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onContextMenu(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    render(): unknown;

    /** @todo Documentation incomplete. */
    select(): unknown;

    /** @todo Documentation incomplete. */
    setColor(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    setData(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setLabel(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    showMenu(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    update(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    updatePath(): unknown;
}
