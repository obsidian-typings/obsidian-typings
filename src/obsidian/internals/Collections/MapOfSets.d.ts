/** @public @unofficial */
export interface MapOfSets<Key, Value> {
    data: Map<Key, Set<Value>>;

    add(key: Key, value: Value): void;
    delete(key: Key, value: Value): void;
    get(key: Key): Set<Value> | null;
    getArray(key: Key): Value[];
}
