import type { ExtractConstructor } from '../../internals/constructors/ExtractConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Base type for {@link Values} which wrap a single primitive.
   *
   * @typeParam T - The type of the wrapped primitive value.
   * @since 1.10.0
   */
  interface PrimitiveValue<T> extends NotNullValue {
    /**
     * The wrapped primitive value.
     *
     * @unofficial
     */
    data: T;

    /**
     * Constructor.
     *
     * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<PrimitiveValue\>}.
     *
     * @param value - The value to wrap.
     * @returns The new {@link obsidian#PrimitiveValue}.
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes.
     */
    constructor3__?(value: T): this;

    /**
     * Returns a boolean indicating whether this {@link obsidian#PrimitiveValue} is truthy.
     *
     * @returns A boolean indicating whether this {@link obsidian#PrimitiveValue} is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Get the string representation of this {@link obsidian#PrimitiveValue}.
     *
     * @returns The string representation of this {@link obsidian#PrimitiveValue}.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }
}
