import type {
  getNullValueConstructor
} from '../../implementations/constructors/augmentations/values/getNullValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} which represents `null`.
   * NullValue is a singleton and `NullValue.value` should be used instead of calling the constructor.
   *
   * @since 1.10.0
   */
  interface NullValue extends Value {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getNullValueConstructor} from `obsidian-typings/implementations`.
     *
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(): this;

    /**
     * Returns a boolean indicating whether this NullValue is truthy.
     *
     * @returns A boolean indicating whether this NullValue is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Get the string representation of this NullValue.
     *
     * @returns The string representation of this NullValue.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }

  namespace NullValue {
    /**
     * Value.
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link NullValue.value} instead.
     */
    var value__: NullValue;
  }
}
