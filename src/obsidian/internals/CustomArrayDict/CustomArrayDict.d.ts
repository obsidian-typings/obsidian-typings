import type { CustomArrayDictDataRecord } from "./CustomArrayDictDataRecord.js";

/** @todo Documentation incomplete */
export interface CustomArrayDict<T> {
    data: CustomArrayDictDataRecord<T>;

    add(key: string, value: T): void;
    clear(key: string): void;
    clearAll(): void;
    contains(key: string, value: T): boolean;
    count(): number;
    get(key: string): T[] | null;
    keys(): string[];
    remove(key: string, value: T): void;
    removeKey(key: string): void;
}
