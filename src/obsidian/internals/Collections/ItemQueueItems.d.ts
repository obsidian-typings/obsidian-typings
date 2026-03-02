/**
 * Backing storage for an ItemQueue, providing queue operations on an array.
 * @public
 * @unofficial
 */
export interface ItemQueueItems<T> {
    /** Number of items in the queue. */
    length: number;

    /** Index offset for the next dequeue operation. */
    offset: number;

    /** Internal array holding queued items. */
    queue: T[];

    /** Remove all items from the queue. */
    clear(): void;

    /** Remove and return the next item from the front of the queue. */
    dequeue(): T | undefined;

    /** Add an item to the end of the queue. */
    enqueue(item: T): void;

    /** Add multiple items to the end of the queue. */
    enqueueArray(items: T[]): void;

    /** Get all items currently in the queue. */
    get(): T[];

    /** Whether the queue has no items. */
    isEmpty(): boolean;

    /** Return the next item without removing it. */
    peek(): T | undefined;

    /** Remove a specific item from the queue. */
    remove(item: T): void;
}
