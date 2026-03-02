/**
 * A dictionary mapping string keys to arrays of values.
 * @public
 * @unofficial
 */
export interface CustomArrayDict<T> {
    /** Internal map storing key-to-array mappings. */
    data: Map<string, T[]>;

    /** Add a value to the array associated with the given key. */
    add(key: string, value: T): void;

    /** Remove all values for the given key. */
    clear(key: string): void;

    /** Remove all keys and their values. */
    clearAll(): void;

    /** Check whether the array for the given key contains the specified value. */
    contains(key: string, value: T): boolean;

    /** Get the total number of values across all keys. */
    count(): number;

    /** Get the array of values for the given key, or null if not found. */
    get(key: string): T[] | null;

    /** Get all keys in the dictionary. */
    keys(): string[];

    /** Remove a specific value from the array associated with the given key. */
    remove(key: string, value: T): void;
}
