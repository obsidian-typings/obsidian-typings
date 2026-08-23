import type { DisplayObject } from './DisplayObject.d.ts';
import type { ICanvas } from './ICanvas.d.ts';
import type { PixiEventSystem } from './PixiEventSystem.d.ts';
import type { PixiRectangle } from './PixiRectangle.d.ts';

/**
 * Renderer interface.
 *
 * @public
 * @unofficial
 */
export interface IRenderer<VIEW extends ICanvas = ICanvas> {
  /** The federated event system of this renderer (read-only). */
  readonly events: PixiEventSystem;

  /** Renderer resolution (read-only). */
  readonly resolution: number;

  /** Screen rectangle (read-only). */
  readonly screen: PixiRectangle;

  /** Canvas view (read-only). */
  readonly view: VIEW;

  /**
   * Destroys the renderer.
   *
   * @param removeView - Whether to remove the view from the DOM.
   */
  destroy(removeView?: boolean): void;

  /**
   * Renders a display object.
   *
   * @param displayObject - The display object to render.
   */
  render(displayObject: DisplayObject): void;

  /**
   * Resizes the renderer.
   *
   * @param desiredScreenWidth - New width.
   * @param desiredScreenHeight - New height.
   */
  resize(desiredScreenWidth: number, desiredScreenHeight: number): void;
}
