/**
 * A dictionary mapping string keys to arrays of values.
 *
 * @typeParam T - The type of the values.
 * @public
 * @unofficial
 */
export interface CustomArrayDict<T> {
  /** Internal map storing key-to-array mappings. */
  data: Map<string, T[]>;

  /**
   * Add a value to the array associated with the given key.
   *
   * @param key - The key.
   * @param value - The value to add.
   */
  add(key: string, value: T): void;

  /**
   * Remove all values for the given key.
   *
   * @param key - The key to clear.
   */
  clear(key: string): void;

  /** Remove all keys and their values. */
  clearAll(): void;

  /**
   * Check whether the array for the given key contains the specified value.
   *
   * @param key - The key.
   * @param value - The value to check.
   * @returns Whether the value exists.
   */
  contains(key: string, value: T): boolean;

  /**
   * Get the total number of values across all keys.
   *
   * @returns Total value count.
   */
  count(): number;

  /**
   * Get the array of values for the given key, or `null` if not found.
   *
   * @param key - The key.
   * @returns Array of values, or `null`.
   */
  get(key: string): null | T[];

  /**
   * Get all keys in the dictionary.
   *
   * @returns Array of keys.
   */
  keys(): string[];

  /**
   * Remove a specific value from the array associated with the given key.
   *
   * @param key - The key.
   * @param value - The value to remove.
   */
  remove(key: string, value: T): void;
}
