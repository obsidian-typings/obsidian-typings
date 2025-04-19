/** @public @unofficial */
export interface WeakMapWrapper<K extends object, V> extends WeakMap<K, V> {
    map: WeakMap<K, V>;
}
