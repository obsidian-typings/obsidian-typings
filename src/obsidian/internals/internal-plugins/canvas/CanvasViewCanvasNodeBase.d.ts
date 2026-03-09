import type { CanvasViewCanvasNodeBaseBase } from './CanvasViewCanvasNodeBaseBase.d.ts';

/**
 * Base interface for canvas nodes, providing core editing and interaction methods.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNodeBase extends CanvasViewCanvasNodeBaseBase {
  /**
   * Remove focus from the node.
   *
   * @returns The result of removing focus.
   */
  blur(): unknown;

  /**
   * Destroy the node and release its resources.
   *
   * @returns The result of destroying the node.
   */
  destroy(): unknown;

  /**
   * Set focus on the node.
   *
   * @returns The result of focusing the node.
   */
  focus(): unknown;

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
   * Handle click events on the node.
   *
   * @returns The result of handling the click.
   */
  onClick(arg1: unknown): unknown;

  /**
   * Handle double-click on a resize handle to auto-size the node.
   *
   * @returns The result of handling the resize double-click.
   */
  onResizeDblclick(arg1: unknown, arg2: unknown): unknown;

  /**
   * Render the node to the canvas.
   *
   * @returns The result of rendering the node.
   */
  render(): unknown;

  /**
   * Enter editing mode for the node's content.
   *
   * @returns The result of starting editing.
   */
  startEditing(arg1?: unknown): unknown;

  /**
   * Unload the child editor view.
   *
   * @returns The result of unloading the child.
   */
  unloadChild(): unknown;
}
