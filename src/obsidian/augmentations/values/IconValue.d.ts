import type {
  getIconValueConstructor
} from '../../implementations/constructors/augmentations/values/getIconValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a renderable icon.
   *
   * @since 1.10.0
   */
  interface IconValue extends StringValue {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getIconValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - The value.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor5__(value: string): this;
  }
}
