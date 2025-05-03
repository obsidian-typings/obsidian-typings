/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface WeakMapWrapper<K extends object, V> extends WeakMap<K, V> {
    /** @todo Documentation incomplete. */
    map: WeakMap<K, V>;
}
