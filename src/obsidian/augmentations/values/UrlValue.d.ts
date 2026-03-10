import type {
  getUrlValueConstructor
} from '../../implementations/constructors/augmentations/values/getUrlValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping an external link.
   *
   * @since 1.10.0
   */
  interface UrlValue extends StringValue {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getUrlValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - The value.
     * @param display - The display text.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor5__(value: string, display?: string | null): this;
  }
}
