/**
 * A task representing an ongoing page render operation.
 *
 * @public
 * @unofficial
 */
export interface RenderTask {
  /** Promise that resolves when rendering is complete. */
  promise: Promise<void>;

  /**
   * Cancels the render task.
   *
   * @param extraDelay - Optional extra delay before cancellation.
   */
  cancel(extraDelay?: number): void;

  /** Callback invoked to allow continuation of rendering. */
  onContinue?(cont: () => void): void;
}
