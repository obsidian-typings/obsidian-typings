import type { BBox } from './BBox.d.ts';
import type { Bezier } from './Bezier.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';
import type { CanvasViewCanvasEdgeLineEnd } from './CanvasViewCanvasEdgeLineEnd.d.ts';
import type { CanvasViewCanvasEdgeLink } from './CanvasViewCanvasEdgeLink.d.ts';
import type { CanvasViewCanvasEdgePath } from './CanvasViewCanvasEdgePath.d.ts';

/** @public @unofficial */
export interface CanvasViewCanvasEdge {
    bbox: BBox;
    bezier: Bezier;
    canvas: CanvasViewCanvas;
    color: string;
    from: CanvasViewCanvasEdgeLink;
    fromLineEnd: CanvasViewCanvasEdgeLineEnd | null;
    id: string;
    initialized: boolean;
    isAttached?: unknown;
    label: string;
    lineEndGroupEl: SVGGElement;
    lineGroupEl: SVGGElement;
    path: CanvasViewCanvasEdgePath;
    to: CanvasViewCanvasEdgeLink;
    toLineEnd: CanvasViewCanvasEdgeLineEnd | null;
    unknownData: Object;

    attach(): unknown;
    blur(): unknown;
    createEdgeEnd(arg1: unknown): unknown;
    deselect(): unknown;
    destroy(): unknown;
    detach(): unknown;
    editLabel(): unknown;
    focus(): unknown;
    getBBox(): unknown;
    getCenter(): unknown;
    getData(): unknown;
    initialize(): unknown;
    onClick(arg1: unknown): unknown;
    onConnectionPointerdown(arg1: unknown): unknown;
    onContextMenu(arg1: unknown): unknown;
    render(): unknown;
    select(): unknown;
    setColor(arg1: unknown, arg2: unknown): unknown;
    setData(arg1: unknown): unknown;
    setLabel(arg1: unknown): unknown;
    showMenu(arg1: unknown, arg2: unknown): unknown;
    update(arg1: unknown, arg2: unknown): unknown;
    updatePath(): unknown;
}
