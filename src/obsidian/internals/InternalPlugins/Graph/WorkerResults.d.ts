/**
 * Worker results.
 *
 * @public
 * @unofficial
 */
export interface WorkerResults {
    /** Shared buffer containing node position data from the simulation worker. */
    buffer: SharedArrayBuffer;

    /** Array of node identifiers corresponding to entries in the buffer. */
    id: number[];

    /** Version counter for tracking simulation updates. */
    v?: number;
}
