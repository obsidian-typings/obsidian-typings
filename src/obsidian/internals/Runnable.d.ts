/**
 * A controllable task with start, stop, and cancel lifecycle.
 *
 * @public
 * @unofficial
 */
export interface Runnable {
  /** Whether the runnable has been cancelled. */
  cancelled: boolean;

  /** Callback invoked when the runnable is cancelled. */
  onCancel: (() => void) | null;

  /** Callback invoked when the runnable starts. */
  onStart: (() => void) | null;

  /** Callback invoked when the runnable stops. */
  onStop: (() => void) | null;

  /** Whether the runnable is currently running. */
  running: boolean;

  /** Cancel the runnable. */
  cancel(): void;

  /**
   * Check whether the runnable has been cancelled.
   *
   * @returns Whether the runnable has been cancelled.
   */
  isCancelled(): boolean;

  /**
   * Check whether the runnable is currently running.
   *
   * @returns Whether the runnable is currently running.
   */
  isRunning(): boolean;

  /** Start the runnable. */
  start(): void;

  /** Stop the runnable. */
  stop(): void;
}
