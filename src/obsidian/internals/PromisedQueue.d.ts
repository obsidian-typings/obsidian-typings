/** @public */
export interface PromisedQueue {
    promise: Promise<unknown>;

    queue<T>(fn: () => T | Promise<T>): Promise<T>;
}
