import type { getDisplayValueComponentConstructor } from '../../../implementations/constructors/augmentations/settings/setting-components/getDisplayValueComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A read-only display value for a setting row: a value label and an optional
   * status indicator. On a navigable row, it surfaces the value edited on the
   * page the row opens, so the user can see it without opening that page.
   *
   * @since 1.13.1
   */
  interface DisplayValueComponent {
    /**
     * The HTML element that holds the value label.
     *
     * @official
     * @since 1.13.1
     */
    valueEl: HTMLElement;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getDisplayValueComponentConstructor} from `obsidian-typings/implementations`.
     *
     * @param containerEl - The container element.
     * @returns The display value component instance.
     * @official
     * @since 1.13.1
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(containerEl: HTMLElement): this;

    /**
     * Show a status indicator on the row. Use `'warning'` when the value needs
     * the user's attention; the explanation itself belongs on the page this
     * row leads to, while this only signals that there is something to look at.
     *
     * @param status - The status to show, or `null` to clear it.
     * @returns The display value component.
     * @official
     * @since 1.13.1
     */
    setStatus(status: 'warning' | null): this;

    /**
     * Set the value label text.
     *
     * @param value - The value label text, or an empty string or `null` to clear it.
     * @returns The display value component.
     * @official
     * @since 1.13.1
     */
    setValue(value: null | string): this;
  }
}
