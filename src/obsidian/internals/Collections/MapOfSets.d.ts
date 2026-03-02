/**
 * A map where each key is associated with a set of values.
 * @public
 * @unofficial
 */
export interface MapOfSets<Key, Value> {
    /** Internal map storing key-to-set mappings. */
    data: Map<Key, Set<Value>>;

    /** Add a value to the set associated with the given key. */
    add(key: Key, value: Value): void;

    /** Remove a value from the set associated with the given key. */
    delete(key: Key, value: Value): void;

    /** Get the set of values for the given key, or null if not found. */
    get(key: Key): Set<Value> | null;

    /** Get the values for the given key as an array. */
    getArray(key: Key): Value[];
}
