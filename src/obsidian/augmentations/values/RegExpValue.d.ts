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
     * Constructor.
     *
     * To get the constructor instance, use {@link getRegExpValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param regexp - The regular expression.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(regexp: RegExp): this;

    /**
     * Returns a boolean indicating whether this RegExpValue is truthy.
     *
     * @returns A boolean indicating whether this RegExpValue is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * Get the string representation of this RegExpValue.
     *
     * @returns The string representation of this RegExpValue.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }
}
