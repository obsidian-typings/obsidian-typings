import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * Manages the visual selection state on the canvas, including selection bounds and resize handles.
 *
 * @public
 * @unofficial
 */
export interface CanvasSelection {
  /** Bounding box encompassing all selected items. */
  bbox: BBox;

  /** Reference to the parent canvas instance. */
  canvas: CanvasViewCanvas;

  /** Array of resize handle elements around the selection. */
  resizerEls: HTMLDivElement[];

  /** Element displaying the selection highlight rectangle. */
  selectionEl: HTMLDivElement;

  /**
   * Hide the selection rectangle and handles.
   *
   * @returns The result of hiding the selection.
   */
  hide(): unknown;

  /**
   * Handle pointer down on a resize handle to start resizing the selection.
   *
   * @returns The result of handling the resize pointer down.
   */
  onResizePointerdown(arg1: unknown, arg2: unknown): unknown;

  /**
   * Update the selection rectangle to match the current selected items.
   *
   * @returns The result of updating the selection.
   */
  update(arg1: unknown): unknown;
}
