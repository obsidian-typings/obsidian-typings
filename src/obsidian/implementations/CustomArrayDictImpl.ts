import type { CustomArrayDict } from '../internals/CustomArrayDict/CustomArrayDict.js';
import type { CustomArrayDictDataRecord } from '../internals/CustomArrayDict/CustomArrayDictDataRecord.js';

export class CustomArrayDictImpl<T> implements CustomArrayDict<T> {
    public data: CustomArrayDictDataRecord<T> = {};

    public add(key: string, value: T): void {
        if (!(this.data.hasOwnProperty(key))) {
            this.data[key] = [] as T[];
        }

        const values = this.data[key]!;

        if (!values.includes(value)) {
            values.push(value);
        }
    }

    public remove(key: string, value: T): void {
        const values = this.data[key];
        if (!values) {
            return;
        }
        values.remove(value);

        if (values.length === 0) {
            delete this.data[key];
        }
    }

    public removeKey(key: string): void {
        delete this.data[key];
    }

    public get(key: string): T[] | null {
        return this.data.hasOwnProperty(key) ? this.data[key]! : null;
    }

    public keys(): string[] {
        return Object.keys(this.data);
    }

    public clear(key: string): void {
        delete this.data[key];
    }

    public clearAll(): void {
        this.data = {};
    }

    public contains(key: string, value: T): boolean {
        const values = this.data[key];
        return values && values.contains(value) || false;
    }

    public count(): number {
        let ans = 0;
        for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                ans += this.data[key]!.length;
            }
        }

        return ans;
    }
}
