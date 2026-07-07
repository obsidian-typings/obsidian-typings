import type { getTextComponentConstructor } from '../../../implementations/constructors/augmentations/settings/setting-components/getTextComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A text component.
   *
   * @since 0.9.21
   */
  interface TextComponent extends AbstractTextComponent<HTMLInputElement> {
    /**
     * Selects the input's text when it receives focus.
     *
     * @param force - Whether to enable select-on-focus even without a physical keyboard.
     * @returns The text component.
     * @unofficial
     */
    autoSelect(force?: boolean): this;

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
    constructor4__?(containerEl: HTMLElement): this;
  }
}
