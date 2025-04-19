import type { Runnable } from '../Runnable.d.ts';
import type { ItemQueueItems } from './ItemQueueItems.d.ts';

/** @public @unofficial */
export interface ItemQueue<T> {
    items: ItemQueueItems<T>;
    promise: PromiseWithResolvers<T> | null;
    runnable: Runnable;

    add(item: T): void;
    addList(items: T[]): void;
    cancel(): void;
    clear(): void;
    generator(): AsyncGenerator<T>;
    notify(): void;
    remove(item: T): void;
}
