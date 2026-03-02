import type { Runnable } from '../Runnable.d.ts';
import type { ItemQueueItems } from './ItemQueueItems.d.ts';

/**
 * An async item queue that supports generator-based consumption.
 * @public
 * @unofficial
 */
export interface ItemQueue<T> {
    /** Backing storage for the queue items. */
    items: ItemQueueItems<T>;

    /** Promise resolvers for awaiting the next item. */
    promise: PromiseWithResolvers<T> | null;

    /** Runnable controlling the queue's start/stop lifecycle. */
    runnable: Runnable;

    /** Add a single item to the queue. */
    add(item: T): void;

    /** Add multiple items to the queue. */
    addList(items: T[]): void;

    /** Cancel the queue and stop processing. */
    cancel(): void;

    /** Remove all items from the queue. */
    clear(): void;

    /** Return an async generator that yields items as they are enqueued. */
    generator(): AsyncGenerator<T>;

    /** Notify the queue that a new item is available for consumption. */
    notify(): void;

    /** Remove a specific item from the queue. */
    remove(item: T): void;
}
