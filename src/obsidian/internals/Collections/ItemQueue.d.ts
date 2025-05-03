import type { Runnable } from '../Runnable.d.ts';
import type { ItemQueueItems } from './ItemQueueItems.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ItemQueue<T> {
    /** @todo Documentation incomplete. */
    items: ItemQueueItems<T>;

    /** @todo Documentation incomplete. */
    promise: PromiseWithResolvers<T> | null;

    /** @todo Documentation incomplete. */
    runnable: Runnable;

    /** @todo Documentation incomplete. */
    add(item: T): void;

    /** @todo Documentation incomplete. */
    addList(items: T[]): void;

    /** @todo Documentation incomplete. */
    cancel(): void;

    /** @todo Documentation incomplete. */
    clear(): void;

    /** @todo Documentation incomplete. */
    generator(): AsyncGenerator<T>;

    /** @todo Documentation incomplete. */
    notify(): void;

    /** @todo Documentation incomplete. */
    remove(item: T): void;
}
