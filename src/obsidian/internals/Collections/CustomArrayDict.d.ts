/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CustomArrayDict<T> {
    /** @todo Documentation incomplete. */
    data: Map<string, T[]>;

    /** @todo Documentation incomplete. */
    add(key: string, value: T): void;

    /** @todo Documentation incomplete. */
    clear(key: string): void;

    /** @todo Documentation incomplete. */
    clearAll(): void;

    /** @todo Documentation incomplete. */
    contains(key: string, value: T): boolean;

    /** @todo Documentation incomplete. */
    count(): number;

    /** @todo Documentation incomplete. */
    get(key: string): T[] | null;

    /** @todo Documentation incomplete. */
    keys(): string[];

    /** @todo Documentation incomplete. */
    remove(key: string, value: T): void;
}
