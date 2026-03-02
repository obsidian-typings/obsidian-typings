import type { CanvasViewCanvasNodeBaseBase } from './CanvasViewCanvasNodeBaseBase.d.ts';

/**
 * Base interface for canvas nodes, providing core editing and interaction methods.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNodeBase extends CanvasViewCanvasNodeBaseBase {
    /** Remove focus from the node. */
    blur(): unknown;

    /** Destroy the node and release its resources. */
    destroy(): unknown;

    /** Set focus on the node. */
    focus(): unknown;

    /** Initialize the node after construction. */
    initialize(): unknown;

    /** Check whether this node supports editing. */
    isEditable(): unknown;

    /** Move and resize the node to the specified bounds. */
    moveAndResize(arg1: unknown): unknown;

    /** Handle click events on the node. */
    onClick(arg1: unknown): unknown;

    /** Handle double-click on a resize handle to auto-size the node. */
    onResizeDblclick(arg1: unknown, arg2: unknown): unknown;

    /** Render the node to the canvas. */
    render(): unknown;

    /** Enter editing mode for the node's content. */
    startEditing(arg1?: unknown): unknown;

    /** Unload the child editor view. */
    unloadChild(): unknown;
}
