/**
 * @public
 * @unofficial
 */
export interface MapOfSets<Key, Value> {
    /** @todo Documentation incomplete. */
    data: Map<Key, Set<Value>>;

    /** @todo Documentation incomplete. */
    add(key: Key, value: Value): void;

    /** @todo Documentation incomplete. */
    delete(key: Key, value: Value): void;

    /** @todo Documentation incomplete. */
    get(key: Key): Set<Value> | null;

    /** @todo Documentation incomplete. */
    getArray(key: Key): Value[];
}
