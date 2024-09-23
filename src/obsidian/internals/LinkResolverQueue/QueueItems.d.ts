/**
 * @public
 */
export interface QueueItems<T> {
    queue: T[];
    offset: number;
    length: number;

    clear(): void;
    dequeue(): T | undefined;
    enqueue(item: T): void;
    enqueueArray(items: T[]): void;
    get(): T[];
    isEmpty(): boolean;
    peek(): T | undefined;
    remove(item: T): void;
}
