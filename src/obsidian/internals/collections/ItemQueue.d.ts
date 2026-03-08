import type { Runnable } from '../Runnable.d.ts';
import type { ItemQueueItems } from './ItemQueueItems.d.ts';

/**
 * An async item queue that supports generator-based consumption.
 *
 * @typeParam T - The type of the items.
 * @public
 * @unofficial
 */
export interface ItemQueue<T> {
    /**
     * Add a single item to the queue.
     *
     * @param item - Item to add.
     */
    add(item: T): void;

    /**
     * Add multiple items to the queue.
     *
     * @param items - Items to add.
     */
    addList(items: T[]): void;

    /** Cancel the queue and stop processing. */
    cancel(): void;

    /** Remove all items from the queue. */
    clear(): void;

    /**
     * Return an async generator that yields items as they are enqueued.
     *
     * @returns Async generator of items.
     */
    generator(): AsyncGenerator<T>;

    /** Backing storage for the queue items. */
    items: ItemQueueItems<T>;

    /** Notify the queue that a new item is available for consumption. */
    notify(): void;

    /** Promise resolvers for awaiting the next item. */
    promise: PromiseWithResolvers<T> | null;

    /**
     * Remove a specific item from the queue.
     *
     * @param item - Item to remove.
     */
    remove(item: T): void;

    /** Runnable controlling the queue's start/stop lifecycle. */
    runnable: Runnable;
}
