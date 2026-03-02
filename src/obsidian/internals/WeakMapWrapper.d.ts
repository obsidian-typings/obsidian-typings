/**
 * Wrapper around a WeakMap providing the same interface with an inner map reference.
 *
 * @typeParam K - The key type.
 * @typeParam V - The value type.
 * @public
 * @unofficial
 */
export interface WeakMapWrapper<K extends object, V> extends WeakMap<K, V> {
    /** The underlying WeakMap instance. */
    map: WeakMap<K, V>;
}
