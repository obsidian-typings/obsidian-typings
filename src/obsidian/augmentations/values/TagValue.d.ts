import type {
  getTagValueConstructor
} from '../../implementations/constructors/augmentations/values/getTagValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping an Obsidian tag.
   *
   * @since 1.10.0
   */
  interface TagValue extends StringValue {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getTagValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - The value to wrap.
     * @returns The new TagValue.
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes.
     */
    constructor5__(value: string): this;
  }
}
