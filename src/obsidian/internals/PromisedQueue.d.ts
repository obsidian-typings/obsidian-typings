/** @public */
export interface PromisedQueue {
    promise: Promise<void>;
    queue(next: () => void | Promise<void>): Promise<void>;
}
