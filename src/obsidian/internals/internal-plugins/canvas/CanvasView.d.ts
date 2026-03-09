import type {
  HoverPopover,
  TextFileView,
  WorkspaceLeaf
} from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { CanvasPluginInstance } from './CanvasPluginInstance.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';

/**
 * View for displaying and editing canvas files, extending TextFileView.
 * @public
 * @unofficial
 */
export interface CanvasView extends TextFileView {
  /** The canvas controller instance managing nodes, edges, and rendering. */
  canvas: CanvasViewCanvas;

  /** Hover popover associated with this view, or `null` if none is active. */
  hoverPopover: null | HoverPopover;

  /** Reference to the canvas plugin instance. */
  plugin: CanvasPluginInstance;

  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param canvasPluginInstance - The canvas plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor4__(leaf: WorkspaceLeaf, canvasPluginInstance: CanvasPluginInstance): this;

  /**
   * Loads the local data of the canvas.
   *
   * @returns The local canvas data.
   */
  getLocalData(): unknown;

  /**
   * Get the current view type.
   *
   * @returns The view type.
   */
  getViewType(): typeof ViewType.Canvas;

  /**
   * Saves the local data of the canvas.
   */
  saveLocalData(): void;
}
