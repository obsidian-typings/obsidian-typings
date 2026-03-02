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

    /**
     * Attach the edge to the canvas DOM.
     *
     * @returns The result of attaching the edge.
     */
    attach(): unknown;

    /**
     * Remove focus from the edge.
     *
     * @returns The result of removing focus.
     */
    blur(): unknown;

    /**
     * Create a line end marker element for the specified end type.
     *
     * @returns The created edge end element.
     */
    createEdgeEnd(arg1: unknown): unknown;

    /**
     * Deselect the edge.
     *
     * @returns The result of deselecting the edge.
     */
    deselect(): unknown;

    /**
     * Destroy the edge and release its resources.
     *
     * @returns The result of destroying the edge.
     */
    destroy(): unknown;

    /**
     * Detach the edge from the canvas DOM.
     *
     * @returns The result of detaching the edge.
     */
    detach(): unknown;

    /**
     * Open an inline editor for the edge's label.
     *
     * @returns The result of opening the label editor.
     */
    editLabel(): unknown;

    /**
     * Set focus on the edge.
     *
     * @returns The result of focusing the edge.
     */
    focus(): unknown;

    /**
     * Get the bounding box of the edge.
     *
     * @returns The bounding box.
     */
    getBBox(): unknown;

    /**
     * Get the center point of the edge path.
     *
     * @returns The center point.
     */
    getCenter(): unknown;

    /**
     * Get the serialized data for this edge.
     *
     * @returns The edge data.
     */
    getData(): unknown;

    /**
     * Initialize the edge after construction.
     *
     * @returns The result of initializing the edge.
     */
    initialize(): unknown;

    /**
     * Handle click events on the edge.
     *
     * @returns The result of handling the click.
     */
    onClick(arg1: unknown): unknown;

    /**
     * Handle pointer down on a connection point to start re-routing.
     *
     * @returns The result of handling the connection pointer down.
     */
    onConnectionPointerdown(arg1: unknown): unknown;

    /**
     * Handle context menu events on the edge.
     *
     * @returns The result of handling the context menu.
     */
    onContextMenu(arg1: unknown): unknown;

    /**
     * Render the edge to the canvas.
     *
     * @returns The result of rendering the edge.
     */
    render(): unknown;

    /**
     * Mark the edge as selected.
     *
     * @returns The result of selecting the edge.
     */
    select(): unknown;

    /**
     * Set the color of the edge.
     *
     * @returns The result of setting the color.
     */
    setColor(arg1: unknown, arg2: unknown): unknown;

    /**
     * Set the serialized data for this edge.
     *
     * @returns The result of setting the data.
     */
    setData(arg1: unknown): unknown;

    /**
     * Set the text label of the edge.
     *
     * @returns The result of setting the label.
     */
    setLabel(arg1: unknown): unknown;

    /**
     * Show the context menu for this edge.
     *
     * @returns The result of showing the menu.
     */
    showMenu(arg1: unknown, arg2: unknown): unknown;

    /**
     * Update the edge after its connected nodes have moved.
     *
     * @returns The result of updating the edge.
     */
    update(arg1: unknown, arg2: unknown): unknown;

    /**
     * Recalculate and update the SVG path of the edge.
     *
     * @returns The result of updating the path.
     */
    updatePath(): unknown;
}
