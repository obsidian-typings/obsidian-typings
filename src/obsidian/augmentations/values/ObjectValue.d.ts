import type { getObjectValueConstructor } from '../../implementations/constructors/augmentations/values/getObjectValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping an object.
   *
   * @since 1.10.0
   */
  interface ObjectValue extends NotNullValue {
    /**
     * The wrapped object. Values are lazily wrapped into {@link Value}s on access.
     *
     * @unofficial
     */
    data: Record<string, unknown>;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getObjectValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param data - The data.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__?(data: unknown): this;

    /**
     * Get the {@link Value} associated with the provided key, or {@link NullValue}.
     * If the referenced property in the object is not a Value, it will be wrapped before returning.
     *
     * @param key - The key to get the value from.
     * @returns The {@link Value} associated with the provided key, or {@link NullValue}.
     * @official
     * @since 1.10.0
     */
    get(key: string): null | Value;

    /**
     * Gets the {@link Value} for a key, matched case-insensitively.
     *
     * @param key - The key to look up (case-insensitive).
     * @returns The wrapped value, or {@link NullValue} when not found.
     * @unofficial
     */
    getInsensitive(key: string): Value;

    /**
     * Returns a boolean indicating whether this {@link obsidian#ObjectValue} is empty.
     *
     * @returns A boolean indicating whether this {@link obsidian#ObjectValue} is empty.
     * @official
     * @since 1.10.0
     */
    isEmpty(): boolean;

    /**
     * Returns a boolean indicating whether this {@link obsidian#ObjectValue} is truthy.
     *
     * @returns A boolean indicating whether this {@link obsidian#ObjectValue} is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Wraps a raw property value into a {@link Value}.
     *
     * @unofficial
     */
    lazyEvaluator(key: string, raw: unknown): Value;

    /**
     * Get the string representation of this {@link obsidian#ObjectValue}.
     *
     * @returns The string representation of this {@link obsidian#ObjectValue}.
     * @official
     * @since 1.10.0
     */
    toString(): string;

    /**
     * Returns the raw (unwrapped) values of the object's properties.
     *
     * @returns The raw property values.
     * @unofficial
     */
    valuesRaw(): unknown[];
  }

  namespace ObjectValue {
    /**
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link ObjectValue.type} instead.
     */
    const type__: string;
  }
}
