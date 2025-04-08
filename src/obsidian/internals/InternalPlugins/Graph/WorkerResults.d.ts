/**
 * Worker results.
 *
 * @public
 */
export interface WorkerResults {
    buffer: SharedArrayBuffer;
    id: number[];
    v?: number;
}
