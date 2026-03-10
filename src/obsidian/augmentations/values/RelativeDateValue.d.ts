import type {
  getRelativeDateValueConstructor
} from '../../implementations/constructors/augmentations/getRelativeDateValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a Date.
   * RelativeDateValue behaves the same as a {@link DateValue} however it renders as a time relative to now.
   *
   * @since 1.10.0
   */
  interface RelativeDateValue extends DateValue {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getRelativeDateValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param date - The date.
     * @param showTime - Whether to show time. Defaults to `true`.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor4__(date: unknown, showTime?: boolean): this;
  }
}
