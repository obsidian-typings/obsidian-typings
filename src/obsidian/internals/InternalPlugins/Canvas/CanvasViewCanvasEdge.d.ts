import type { BBox } from './BBox.d.ts';
import type { Bezier } from './Bezier.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';
import type { CanvasViewCanvasEdgeLineEnd } from './CanvasViewCanvasEdgeLineEnd.d.ts';
import type { CanvasViewCanvasEdgeLink } from './CanvasViewCanvasEdgeLink.d.ts';
import type { CanvasViewCanvasEdgePath } from './CanvasViewCanvasEdgePath.d.ts';

/**
 * Represents a connection (edge) between two nodes on the canvas.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasEdge {
    /** Bounding box of the edge for spatial indexing. */
    bbox: BBox;

    /** Bezier curve data used for rendering the edge path. */
    bezier: Bezier;

    /** Reference to the parent canvas instance. */
    canvas: CanvasViewCanvas;

    /** Color of the edge line (CSS color string or preset name). */
    color: string;

    /** Link information for the source endpoint of the edge. */
    from: CanvasViewCanvasEdgeLink;

    /** Line end marker at the source endpoint, or null if none. */
    fromLineEnd: CanvasViewCanvasEdgeLineEnd | null;

    /** Unique identifier for this edge. */
    id: string;

    /** Whether the edge has been initialized. */
    initialized: boolean;

    /** Whether the edge is currently attached to the canvas DOM. */
    isAttached?: unknown;

    /** Text label displayed on the edge. */
    label: string;

    /** SVG group element containing the line end markers. */
    lineEndGroupEl: SVGGElement;

    /** SVG group element containing the edge line paths. */
    lineGroupEl: SVGGElement;

    /** SVG path elements for the edge (display and interaction). */
    path: CanvasViewCanvasEdgePath;

    /** Link information for the target endpoint of the edge. */
    to: CanvasViewCanvasEdgeLink;

    /** Line end marker at the target endpoint, or null if none. */
    toLineEnd: CanvasViewCanvasEdgeLineEnd | null;

    /** Additional data properties not covered by known fields. */
    unknownData: Object;

    /** Attach the edge to the canvas DOM. */
    attach(): unknown;

    /** Remove focus from the edge. */
    blur(): unknown;

    /** Create a line end marker element for the specified end type. */
    createEdgeEnd(arg1: unknown): unknown;

    /** Deselect the edge. */
    deselect(): unknown;

    /** Destroy the edge and release its resources. */
    destroy(): unknown;

    /** Detach the edge from the canvas DOM. */
    detach(): unknown;

    /** Open an inline editor for the edge's label. */
    editLabel(): unknown;

    /** Set focus on the edge. */
    focus(): unknown;

    /** Get the bounding box of the edge. */
    getBBox(): unknown;

    /** Get the center point of the edge path. */
    getCenter(): unknown;

    /** Get the serialized data for this edge. */
    getData(): unknown;

    /** Initialize the edge after construction. */
    initialize(): unknown;

    /** Handle click events on the edge. */
    onClick(arg1: unknown): unknown;

    /** Handle pointer down on a connection point to start re-routing. */
    onConnectionPointerdown(arg1: unknown): unknown;

    /** Handle context menu events on the edge. */
    onContextMenu(arg1: unknown): unknown;

    /** Render the edge to the canvas. */
    render(): unknown;

    /** Mark the edge as selected. */
    select(): unknown;

    /** Set the color of the edge. */
    setColor(arg1: unknown, arg2: unknown): unknown;

    /** Set the serialized data for this edge. */
    setData(arg1: unknown): unknown;

    /** Set the text label of the edge. */
    setLabel(arg1: unknown): unknown;

    /** Show the context menu for this edge. */
    showMenu(arg1: unknown, arg2: unknown): unknown;

    /** Update the edge after its connected nodes have moved. */
    update(arg1: unknown, arg2: unknown): unknown;

    /** Recalculate and update the SVG path of the edge. */
    updatePath(): unknown;
}
