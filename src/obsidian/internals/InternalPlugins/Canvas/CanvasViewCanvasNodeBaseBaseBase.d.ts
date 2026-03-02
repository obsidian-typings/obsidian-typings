/**
 * Lowest-level base interface for canvas nodes, providing core properties and interaction methods.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNodeBaseBaseBase {
    /** Whether the node is currently attached to the canvas DOM. */
    isAttached?: unknown;

    /** Whether the node currently has focus. */
    isFocused?: unknown;

    /** Bounding rectangle of the node. */
    rect: CanvasRect;

    /** Attach the node to the canvas DOM. */
    attach(): unknown;

    /** Remove focus from the node. */
    blur(): unknown;

    /** Deselect the node. */
    deselect(): unknown;

    /** Destroy the node and release its resources. */
    destroy(): unknown;

    /** Detach the node from the canvas DOM. */
    detach(): unknown;

    /** Set focus on the node. */
    focus(): unknown;

    /** Get the bounding box of the node. */
    getBBox(): unknown;

    /** Get all files connected to this node via edges. */
    getConnectedFiles(): unknown;

    /** Get the serialized data for this node. */
    getData(): unknown;

    /** Initialize the node after construction. */
    initialize(): unknown;

    /** Check whether this node supports editing. */
    isEditable(): unknown;

    /** Move and resize the node to the specified bounds. */
    moveAndResize(arg1: unknown): unknown;

    /** Move the node to the specified position. */
    moveTo(arg1: unknown): unknown;

    /** Handle click events on the node. */
    onClick(arg1: unknown): unknown;

    /** Handle pointer down on a connection handle to start edge creation. */
    onConnectionPointerdown(arg1: unknown, arg2: unknown): unknown;

    /** Handle context menu events on the node. */
    onContextMenu(arg1: unknown): unknown;

    /** Handle pointer down events on the node. */
    onPointerdown(arg1: unknown): unknown;

    /** Handle double-click on a resize handle to auto-size the node. */
    onResizeDblclick(arg1: unknown, arg2: unknown): unknown;

    /** Handle pointer down on a resize handle to start resizing. */
    onResizePointerdown(arg1: unknown, arg2: unknown): unknown;

    /** Perform cleanup before detaching the node. */
    preDetach(): unknown;

    /** Render the node to the canvas. */
    render(): unknown;

    /** Render the node's z-index CSS property. */
    renderZIndex(): unknown;

    /** Resize the node to the specified dimensions. */
    resize(arg1: unknown): unknown;

    /** Mark the node as selected. */
    select(): unknown;

    /** Set the color of the node. */
    setColor(arg1: unknown, arg2: unknown): unknown;

    /** Set the serialized data for this node. */
    setData(arg1: unknown): unknown;

    /** Set whether the node is in editing mode. */
    setIsEditing(arg1: unknown): unknown;

    /** Show the context menu for this node. */
    showMenu(arg1: unknown): unknown;

    /** Enter editing mode for the node's content. */
    startEditing(): unknown;

    /** Update the rendering breakpoint based on the node's current size. */
    updateBreakpoint(arg1: unknown): unknown;

    /** Update the z-index of the node in the stacking order. */
    updateZIndex(): unknown;
}
