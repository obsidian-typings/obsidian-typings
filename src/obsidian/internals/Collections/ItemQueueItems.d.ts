/** @public */
export interface ItemQueueItems<T> {
    length: number;
    offset: number;
    queue: T[];

    clear(): void;
    dequeue(): T | undefined;
    enqueue(item: T): void;
    enqueueArray(items: T[]): void;
    get(): T[];
    isEmpty(): boolean;
    peek(): T | undefined;
    remove(item: T): void;
}
