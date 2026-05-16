import type { ColorSource } from './ColorSource.d.ts';
import type { ICanvas } from './ICanvas.d.ts';

/**
 * Application options.
 *
 * @public
 * @unofficial
 */
export interface IApplicationOptions {
  /** Whether the renderer should use antialiasing. */
  antialias?: boolean;

  /** Whether to automatically adjust for device pixel ratio. */
  autoDensity?: boolean;

  /** Whether to automatically start the render loop. */
  autoStart?: boolean;

  /** Background alpha. */
  backgroundAlpha?: number;

  /** Background color. */
  backgroundColor?: ColorSource;

  /** Whether to clear before each render. */
  clearBeforeRender?: boolean;

  /** Whether to force the canvas renderer. */
  forceCanvas?: boolean;

  /** Height of the renderer. */
  height?: number;

  /** Power preference for the WebGL context. */
  powerPreference?: WebGLPowerPreference;

  /** Whether to preserve the drawing buffer. */
  preserveDrawingBuffer?: boolean;

  /** Element to resize the renderer to. */
  resizeTo?: HTMLElement | Window;

  /** Renderer resolution. */
  resolution?: number;

  /** Whether to use a shared loader. */
  sharedLoader?: boolean;

  /** Whether to use a shared ticker. */
  sharedTicker?: boolean;

  /** Whether the renderer background is transparent. */
  transparent?: boolean;

  /** Canvas view to use. */
  view?: ICanvas;

  /** Width of the renderer. */
  width?: number;
}
