import type { ElectronTraceBufferUsageReturnValue } from './ElectronTraceBufferUsageReturnValue.d.ts';
import type { ElectronTraceCategoriesAndOptions } from './ElectronTraceCategoriesAndOptions.d.ts';
import type { ElectronTraceConfig } from './ElectronTraceConfig.d.ts';

/**
 * Collects tracing data from Chromium's content module for finding performance bottlenecks and slow operations.
 *
 * @public
 * @unofficial
 */
export interface ElectronContentTracing {
  /**
   * Get a set of category groups. The category groups can change as new code paths are reached. See also the list of
   * built-in tracing categories.
   *
   * @returns A promise that resolves with an array of category groups once all child processes have acknowledged the
   * `getCategories` request.
   */
  getCategories(): Promise<string[]>;

  /**
   * Get the maximum usage across processes of the trace buffer as a percentage of the full state.
   *
   * @returns A promise that resolves with an object containing the `value` and `percentage` of the trace buffer maximum
   * usage.
   */
  getTraceBufferUsage(): Promise<ElectronTraceBufferUsageReturnValue>;

  /**
   * Start recording on all processes.
   *
   * Recording begins immediately locally and asynchronously on child processes as soon as they receive the
   * `EnableRecording` request. If a recording is already running, the promise will be immediately resolved, as only one
   * trace operation can be in progress at a time.
   *
   * @param options - The trace configuration.
   * @returns A promise resolved once all child processes have acknowledged the `startRecording` request.
   */
  startRecording(options: (ElectronTraceCategoriesAndOptions) | (ElectronTraceConfig)): Promise<void>;

  /**
   * Stop recording on all processes.
   *
   * Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be
   * written to a temporary file, and the path will be returned in the promise.
   *
   * @param resultFilePath - The path to write the traced data to.
   * @returns A promise that resolves with a path to a file that contains the traced data once all child processes have
   * acknowledged the `stopRecording` request.
   */
  stopRecording(resultFilePath?: string): Promise<string>;
}
