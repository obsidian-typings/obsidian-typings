/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface ItemQueueItems<T> {
    /** @todo Documentation incomplete. */
    length: number;

    /** @todo Documentation incomplete. */
    offset: number;

    /** @todo Documentation incomplete. */
    queue: T[];

    /** @todo Documentation incomplete. */
    clear(): void;

    /** @todo Documentation incomplete. */
    dequeue(): T | undefined;

    /** @todo Documentation incomplete. */
    enqueue(item: T): void;

    /** @todo Documentation incomplete. */
    enqueueArray(items: T[]): void;

    /** @todo Documentation incomplete. */
    get(): T[];

    /** @todo Documentation incomplete. */
    isEmpty(): boolean;

    /** @todo Documentation incomplete. */
    peek(): T | undefined;

    /** @todo Documentation incomplete. */
    remove(item: T): void;
}
