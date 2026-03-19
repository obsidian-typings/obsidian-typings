import type { CustomArrayDict } from '../../internals/collections/CustomArrayDict.d.d.ts';

/**
 * A dictionary that maps string keys to arrays of unique values, implementing {@link CustomArrayDict}.
 *
 * @public
 * @unofficial
 */
export class CustomArrayDictImpl<T> implements CustomArrayDict<T> {
  /** Internal map storing key-to-array mappings. */
  public data: Map<string, T[]> = new Map();

  /**
   * Add a value to the array associated with the given key.
   *
   * @param key - The key.
   * @param value - The value to add.
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
   * Remove all values for the given key.
   *
   * @param key - The key to clear.
   */
  public clear(key: string): void {
    this.data.delete(key);
  }

  /** Remove all keys and their values. */
  public clearAll(): void {
    this.data.clear();
  }

  /**
   * Check whether the array for the given key contains the specified value.
   *
   * @param key - The key.
   * @param value - The value to check.
   * @returns Whether the value exists.
   */
  public contains(key: string, value: T): boolean {
    return !!this.get(key)?.contains(value);
  }

  /**
   * Get the total number of values across all keys.
   *
   * @returns Total value count.
   */
  public count(): number {
    let ans = 0;
    for (const key of this.keys()) {
      ans += this.get(key)?.length ?? 0;
    }

    return ans;
  }

  /**
   * Get the array of values for the given key, or `null` if not found.
   *
   * @param key - The key.
   * @returns Array of values, or `null`.
   */
  public get(key: string): null | T[] {
    return this.data.get(key) || null;
  }

  /**
   * Get all keys in the dictionary.
   *
   * @returns Array of keys.
   */
  public keys(): string[] {
    return Array.from(this.data.keys());
  }

  /**
   * Remove a specific value from the array associated with the given key.
   *
   * @param key - The key.
   * @param value - The value to remove.
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
