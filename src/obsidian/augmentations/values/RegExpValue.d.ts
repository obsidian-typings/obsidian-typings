import type { getRegExpValueConstructor } from '../../implementations/constructors/augmentations/values/getRegExpValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a RegExp pattern.
   *
   * @since 1.10.0
   */
  interface RegExpValue extends NotNullValue {
    /**
     * The wrapped regular expression.
     *
     * @unofficial
     */
    regexp: RegExp;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getRegExpValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param regexp - The regular expression.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__?(regexp: RegExp): this;

    /**
     * Returns a boolean indicating whether this {@link obsidian#RegExpValue} is truthy.
     *
     * @returns A boolean indicating whether this {@link obsidian#RegExpValue} is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Get the string representation of this {@link obsidian#RegExpValue}.
     *
     * @returns The string representation of this {@link obsidian#RegExpValue}.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }
}
