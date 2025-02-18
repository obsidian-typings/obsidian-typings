/** @todo Documentation incomplete */
/** @public */
export interface CustomArrayDict<T> {
    data: Map<string, T[]>;

    add(key: string, value: T): void;
    clear(key: string): void;
    clearAll(): void;
    contains(key: string, value: T): boolean;
    count(): number;
    get(key: string): T[] | null;
    keys(): string[];
    remove(key: string, value: T): void;
}
