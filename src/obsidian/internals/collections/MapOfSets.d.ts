/**
 * A map where each key is associated with a set of values.
 *
 * @typeParam Key - The key type.
 * @typeParam Value - The value type.
 * @public
 * @unofficial
 */
export interface MapOfSets<Key, Value> {
  /** Internal map storing key-to-set mappings. */
  data: Map<Key, Set<Value>>;

  /**
   * Add a value to the set associated with the given key.
   *
   * @param key - The key.
   * @param value - The value to add.
   */
  add(key: Key, value: Value): void;

  /**
   * Remove a value from the set associated with the given key.
   *
   * @param key - The key.
   * @param value - The value to remove.
   */
  delete(key: Key, value: Value): void;

  /**
   * Get the set of values for the given key, or `null` if not found.
   *
   * @param key - The key.
   * @returns Set of values, or `null`.
   */
  get(key: Key): Set<Value> | null;

  /**
   * Get the values for the given key as an array.
   *
   * @param key - The key.
   * @returns Array of values.
   */
  getArray(key: Key): Value[];
}
