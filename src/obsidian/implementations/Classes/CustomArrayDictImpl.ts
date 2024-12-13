import type { CustomArrayDict } from '../../internals/CustomArrayDict.js';

export class CustomArrayDictImpl<T> implements CustomArrayDict<T> {
    public data: Map<string, T[]> = new Map();

    public add(key: string, value: T): void {
        let values = this.get(key);
        if (!values) {
            values = [];
            this.data.set(key, values);
        }

        if (!values.includes(value)) {
            values.push(value);
        }
    }

    public remove(key: string, value: T): void {
        const values = this.get(key);
        if (!values) {
            return;
        }
        values.remove(value);

        if (values.length === 0) {
            this.clear(key);
        }
    }

    public get(key: string): T[] | null {
        return this.data.get(key) || null;
    }

    public keys(): string[] {
        return Array.from(this.data.keys());
    }

    public clear(key: string): void {
        this.data.delete(key);
    }

    public clearAll(): void {
        this.data.clear();
    }

    public contains(key: string, value: T): boolean {
        return !!this.get(key)?.contains(value);
    }

    public count(): number {
        let ans = 0;
        for (const key in this.keys()) {
            ans += this.get(key)?.length ?? 0;
        }

        return ans;
    }
}
