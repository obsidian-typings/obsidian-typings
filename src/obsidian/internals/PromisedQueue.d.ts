/**
 * A sequential promise queue that ensures functions execute one at a time.
 * @public
 * @unofficial
 */
export interface PromisedQueue {
    /** The current promise in the queue chain. */
    promise: Promise<unknown>;

    /**
     * Add a function to the queue and return a promise for its result.
     *
     * @param fn - The function to enqueue.
     * @returns A promise that resolves with the function's result.
     */
    queue<T>(fn: () => T | Promise<T>): Promise<T>;
}
