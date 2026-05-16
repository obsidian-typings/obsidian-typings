/**
 * Type for the global worker options object.
 *
 * @public
 * @unofficial
 */
export interface GlobalWorkerOptionsType {
  /** The worker port. */
  workerPort: null | unknown;
  /** URL of the worker source file. */
  workerSrc: string;
}
