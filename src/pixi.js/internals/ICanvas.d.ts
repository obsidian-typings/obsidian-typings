/**
 * Canvas interface for PixiJS rendering.
 *
 * @public
 * @unofficial
 */
export interface ICanvas extends Partial<EventTarget> {
  /** Canvas height. */
  height: number;

  /** Canvas width. */
  width: number;

  /**
   * Returns a 2D rendering context.
   *
   * @param contextId - Context identifier.
   * @param options - Context attributes.
   * @returns The 2D rendering context, or `null`.
   */
  getContext(contextId: '2d', options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;

  /**
   * Returns a WebGL rendering context.
   *
   * @param contextId - Context identifier.
   * @param options - Context attributes.
   * @returns The WebGL rendering context, or `null`.
   */
  getContext(contextId: 'experimental-webgl' | 'webgl', options?: WebGLContextAttributes): null | WebGLRenderingContext;

  /**
   * Returns a WebGL2 rendering context.
   *
   * @param contextId - Context identifier.
   * @param options - Context attributes.
   * @returns The WebGL2 rendering context, or `null`.
   */
  getContext(contextId: 'experimental-webgl2' | 'webgl2', options?: WebGLContextAttributes): null | WebGL2RenderingContext;

  /**
   * Converts the canvas to a blob.
   *
   * @param callback - Callback receiving the blob.
   * @param type - Image MIME type.
   * @param quality - Image quality.
   */
  toBlob?(callback: (blob: Blob | null) => void, type?: string, quality?: number): void;

  /**
   * Converts the canvas to a data URL.
   *
   * @param type - Image MIME type.
   * @param quality - Image quality.
   * @returns The data URL string.
   */
  toDataURL?(type?: string, quality?: number): string;
}
