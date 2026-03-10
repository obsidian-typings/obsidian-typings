import type {
  getTextComponentConstructor
} from '../../implementations/constructors/augmentations/components/getTextComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A text component.
   * @since 0.9.21
   */
  interface TextComponent extends AbstractTextComponent<HTMLInputElement> {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getTextComponentConstructor} from `obsidian-typings/implementations`.
     *
     * @param containerEl - The container element.
     * @returns The text component instance.
     * @official
     * @deprecated - Added only for typing purposes.
     */
    constructor4__(containerEl: HTMLElement): this;
  }
}
