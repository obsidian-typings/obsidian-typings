/**
 * Wrapper around a WeakMap providing the same interface with an inner map reference.
 * @public
 * @unofficial
 */
export interface WeakMapWrapper<K extends object, V> extends WeakMap<K, V> {
    /** The underlying WeakMap instance. */
    map: WeakMap<K, V>;
}
