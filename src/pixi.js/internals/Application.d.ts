import type { Container } from './Container.d.ts';
import type { IApplicationOptions } from './IApplicationOptions.d.ts';
import type { ICanvas } from './ICanvas.d.ts';
import type { IDestroyOptions } from './IDestroyOptions.d.ts';
import type { IRenderer } from './IRenderer.d.ts';
import type { PixiRectangle } from './PixiRectangle.d.ts';

/**
 * PixiJS application.
 *
 * @public
 * @unofficial
 */
export declare class Application<VIEW extends ICanvas = ICanvas> {
  /** Renderer instance. */
  renderer: IRenderer<VIEW>;

  /** Root container of the scene graph. */
  stage: Container;

  /**
   * Creates a new application.
   *
   * @param options - Application options.
   */
  constructor(options?: Partial<IApplicationOptions>);

  /**
   * Destroys the application.
   *
   * @param removeView - Whether to remove the view from the DOM.
   * @param stageOptions - Options for destroying the stage.
   */
  destroy(removeView?: boolean, stageOptions?: boolean | IDestroyOptions): void;

  /** Renders the application. */
  render(): void;

  /** Screen rectangle. */
  get screen(): PixiRectangle;

  /** Canvas view. */
  get view(): VIEW;
}
