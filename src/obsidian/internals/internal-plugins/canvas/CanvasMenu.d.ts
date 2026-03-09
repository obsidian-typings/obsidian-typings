import type { CanvasSelection } from './CanvasSelection.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * Context menu and toolbar displayed on the canvas for node/edge actions.
 * @public
 * @unofficial
 */
export interface CanvasMenu {
  /** Reference to the parent canvas instance. */
  canvas: CanvasViewCanvas;

  /** Outer container element for the menu. */
  containerEl: HTMLDivElement;

  /** Element containing the menu buttons and controls. */
  menuEl: HTMLDivElement;

  /** Reference to the current canvas selection. */
  selection: CanvasSelection;

  /**
   * Render the menu for the given selection or context.
   *
   * @returns The result of rendering the menu.
   */
  render(arg1: unknown): unknown;

  /**
   * Update the menu's z-index to stay above the selected items.
   *
   * @returns The result of updating the z-index.
   */
  updateZIndex(arg1: unknown): unknown;
}
