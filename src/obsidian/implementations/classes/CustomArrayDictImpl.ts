import type { CustomArrayDict } from '../../internals/collections/CustomArrayDict.d.d.ts';

/**
 * A dictionary that maps string keys to arrays of unique values, implementing {@link CustomArrayDict}.
 *
 * @public
 * @unofficial
 */
export class CustomArrayDictImpl<T> implements CustomArrayDict<T> {
  /**
   * @todo Documentation incomplete.
   */
  public data: Map<string, T[]> = new Map();

  /**
   * @todo Documentation incomplete.
   */
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

  /**
   * @todo Documentation incomplete.
   */
  public clear(key: string): void {
    this.data.delete(key);
  }

  /**
   * @todo Documentation incomplete.
   */
  public clearAll(): void {
    this.data.clear();
  }

  /**
   * @todo Documentation incomplete.
   */
  public contains(key: string, value: T): boolean {
    return !!this.get(key)?.contains(value);
  }

  /**
   * @todo Documentation incomplete.
   */
  public count(): number {
    let ans = 0;
    for (const key of this.keys()) {
      ans += this.get(key)?.length ?? 0;
    }

    return ans;
  }

  /**
   * @todo Documentation incomplete.
   */
  public get(key: string): null | T[] {
    return this.data.get(key) || null;
  }

  /**
   * @todo Documentation incomplete.
   */
  public keys(): string[] {
    return Array.from(this.data.keys());
  }

  /**
   * @todo Documentation incomplete.
   */
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
}
