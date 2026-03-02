/**
 * Backing storage for an ItemQueue, providing queue operations on an array.
 *
 * @typeParam T - The type of the items.
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

    /**
     * Remove and return the next item from the front of the queue.
     *
     * @returns The dequeued item, or undefined if empty.
     */
    dequeue(): T | undefined;

    /**
     * Add an item to the end of the queue.
     *
     * @param item - Item to enqueue.
     */
    enqueue(item: T): void;

    /**
     * Add multiple items to the end of the queue.
     *
     * @param items - Items to enqueue.
     */
    enqueueArray(items: T[]): void;

    /**
     * Get all items currently in the queue.
     *
     * @returns Array of all queued items.
     */
    get(): T[];

    /**
     * Whether the queue has no items.
     *
     * @returns Whether the queue is empty.
     */
    isEmpty(): boolean;

    /**
     * Return the next item without removing it.
     *
     * @returns The next item, or undefined if empty.
     */
    peek(): T | undefined;

    /**
     * Remove a specific item from the queue.
     *
     * @param item - Item to remove.
     */
    remove(item: T): void;
}
