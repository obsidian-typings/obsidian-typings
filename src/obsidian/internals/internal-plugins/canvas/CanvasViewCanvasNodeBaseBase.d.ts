import type { CanvasViewCanvasNodeBaseBaseBase } from './CanvasViewCanvasNodeBaseBaseBase.d.ts';

/**
 * Intermediate base interface for canvas nodes, adding lifecycle and content mounting methods.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNodeBaseBase extends CanvasViewCanvasNodeBaseBaseBase {
  /**
   * Attach the node to the canvas DOM.
   *
   * @returns The result of attaching the node.
   */
  attach(): unknown;

  /**
   * Detach the node from the canvas DOM.
   *
   * @returns The result of detaching the node.
   */
  detach(): unknown;

  /**
   * Initialize the node after construction.
   *
   * @returns The result of initializing the node.
   */
  initialize(): unknown;

  /**
   * Mount the node's content into the content container.
   *
   * @returns The result of mounting the content.
   */
  mountContent(): unknown;

  /**
   * Perform cleanup before detaching the node.
   *
   * @returns The result of pre-detach cleanup.
   */
  preDetach(): unknown;

  /**
   * Unmount the node's content from the content container.
   *
   * @returns The result of unmounting the content.
   */
  unmountContent(): unknown;

  /**
   * Update the rendering breakpoint based on the node's current size.
   *
   * @returns The result of updating the breakpoint.
   */
  updateBreakpoint(arg1: unknown): unknown;
}
