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

    /**
     * Attach the node to the canvas DOM.
     *
     * @returns The result of attaching the node.
     */
    attach(): unknown;

    /**
     * Remove focus from the node.
     *
     * @returns The result of removing focus.
     */
    blur(): unknown;

    /**
     * Deselect the node.
     *
     * @returns The result of deselecting the node.
     */
    deselect(): unknown;

    /**
     * Destroy the node and release its resources.
     *
     * @returns The result of destroying the node.
     */
    destroy(): unknown;

    /**
     * Detach the node from the canvas DOM.
     *
     * @returns The result of detaching the node.
     */
    detach(): unknown;

    /**
     * Set focus on the node.
     *
     * @returns The result of focusing the node.
     */
    focus(): unknown;

    /**
     * Get the bounding box of the node.
     *
     * @returns The bounding box.
     */
    getBBox(): unknown;

    /**
     * Get all files connected to this node via edges.
     *
     * @returns The connected files.
     */
    getConnectedFiles(): unknown;

    /**
     * Get the serialized data for this node.
     *
     * @returns The node data.
     */
    getData(): unknown;

    /**
     * Initialize the node after construction.
     *
     * @returns The result of initializing the node.
     */
    initialize(): unknown;

    /**
     * Check whether this node supports editing.
     *
     * @returns Whether the node is editable.
     */
    isEditable(): unknown;

    /**
     * Move and resize the node to the specified bounds.
     *
     * @returns The result of moving and resizing.
     */
    moveAndResize(arg1: unknown): unknown;

    /**
     * Move the node to the specified position.
     *
     * @returns The result of moving the node.
     */
    moveTo(arg1: unknown): unknown;

    /**
     * Handle click events on the node.
     *
     * @returns The result of handling the click.
     */
    onClick(arg1: unknown): unknown;

    /**
     * Handle pointer down on a connection handle to start edge creation.
     *
     * @returns The result of handling the connection pointer down.
     */
    onConnectionPointerdown(arg1: unknown, arg2: unknown): unknown;

    /**
     * Handle context menu events on the node.
     *
     * @returns The result of handling the context menu.
     */
    onContextMenu(arg1: unknown): unknown;

    /**
     * Handle pointer down events on the node.
     *
     * @returns The result of handling the pointer down.
     */
    onPointerdown(arg1: unknown): unknown;

    /**
     * Handle double-click on a resize handle to auto-size the node.
     *
     * @returns The result of handling the resize double-click.
     */
    onResizeDblclick(arg1: unknown, arg2: unknown): unknown;

    /**
     * Handle pointer down on a resize handle to start resizing.
     *
     * @returns The result of handling the resize pointer down.
     */
    onResizePointerdown(arg1: unknown, arg2: unknown): unknown;

    /**
     * Perform cleanup before detaching the node.
     *
     * @returns The result of pre-detach cleanup.
     */
    preDetach(): unknown;

    /**
     * Render the node to the canvas.
     *
     * @returns The result of rendering the node.
     */
    render(): unknown;

    /**
     * Render the node's z-index CSS property.
     *
     * @returns The result of rendering the z-index.
     */
    renderZIndex(): unknown;

    /**
     * Resize the node to the specified dimensions.
     *
     * @returns The result of resizing the node.
     */
    resize(arg1: unknown): unknown;

    /**
     * Mark the node as selected.
     *
     * @returns The result of selecting the node.
     */
    select(): unknown;

    /**
     * Set the color of the node.
     *
     * @returns The result of setting the color.
     */
    setColor(arg1: unknown, arg2: unknown): unknown;

    /**
     * Set the serialized data for this node.
     *
     * @returns The result of setting the data.
     */
    setData(arg1: unknown): unknown;

    /**
     * Set whether the node is in editing mode.
     *
     * @returns The result of setting the editing state.
     */
    setIsEditing(arg1: unknown): unknown;

    /**
     * Show the context menu for this node.
     *
     * @returns The result of showing the menu.
     */
    showMenu(arg1: unknown): unknown;

    /**
     * Enter editing mode for the node's content.
     *
     * @returns The result of starting editing.
     */
    startEditing(): unknown;

    /**
     * Update the rendering breakpoint based on the node's current size.
     *
     * @returns The result of updating the breakpoint.
     */
    updateBreakpoint(arg1: unknown): unknown;

    /**
     * Update the z-index of the node in the stacking order.
     *
     * @returns The result of updating the z-index.
     */
    updateZIndex(): unknown;
}
