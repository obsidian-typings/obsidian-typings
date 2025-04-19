/**
 * Worker results.
 *
 * @public @unofficial
 */
export interface WorkerResults {
    buffer: SharedArrayBuffer;
    id: number[];
    v?: number;
}
