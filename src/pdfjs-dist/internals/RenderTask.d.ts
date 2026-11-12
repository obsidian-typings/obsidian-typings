/**
 * A task representing an ongoing page render operation.
 *
 * @public
 * @unofficial
 */
export interface RenderTask {
  /**
   * Callback invoked before each rendering step, or `null` (the initial value) to continue at once.
   * When set, rendering continues only once it calls the given function.
   */
  onContinue: ((cont: () => void) => void) | null;
  /** Callback invoked with the error when rendering fails or is cancelled, or `null` (the initial value). */
  onError: ((error: unknown) => void) | null;
  /** Promise that resolves when rendering is complete. */
  promise: Promise<void>;

  /**
   * Cancels the render task.
   *
   * @param extraDelay - Optional extra delay before cancellation.
   */
  cancel(extraDelay?: number): void;
}
