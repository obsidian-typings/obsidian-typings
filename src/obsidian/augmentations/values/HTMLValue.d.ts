import type { getHTMLValueConstructor } from '../../implementations/constructors/augmentations/values/getHTMLValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping raw HTML.
   *
   * @since 1.10.0
   */
  interface HTMLValue extends StringValue {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getHTMLValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - The value.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor5__(value: string): this;
  }
}
