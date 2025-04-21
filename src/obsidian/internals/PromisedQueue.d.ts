/**
 * @public
 * @unofficial
 */
export interface PromisedQueue {
    /** @todo Documentation incomplete. */
    promise: Promise<unknown>;

    /** @todo Documentation incomplete. */
    queue<T>(fn: () => T | Promise<T>): Promise<T>;
}
