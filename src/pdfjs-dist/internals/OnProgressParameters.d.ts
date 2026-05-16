/**
 * Parameters for document loading progress callbacks.
 *
 * @public
 * @unofficial
 */
export interface OnProgressParameters {
  /** Number of bytes loaded so far. */
  loaded: number;
  /** Total number of bytes to load. */
  total: number;
}
