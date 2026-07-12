import type { ElectronStartLoggingOptions } from './ElectronStartLoggingOptions.d.ts';

/**
 * Records network events for a session to a file for later analysis.
 *
 * @public
 * @unofficial
 */
export interface ElectronNetLog {
  /** Whether network logs are currently being recorded. */
  readonly currentlyLogging: boolean;

  /**
   * Starts recording network events to `path`.
   *
   * @param path - The file path to write the log to.
   * @param options - Options controlling how events are captured.
   * @returns A promise that resolves when the net log has begun recording.
   */
  startLogging(path: string, options?: ElectronStartLoggingOptions): Promise<void>;

  /**
   * Stops recording network events. If not called, net logging will automatically end when the app quits.
   *
   * @returns A promise that resolves when the net log has been flushed to disk.
   */
  stopLogging(): Promise<void>;
}
