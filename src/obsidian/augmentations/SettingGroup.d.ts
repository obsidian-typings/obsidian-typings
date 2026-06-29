import type { getSettingGroupConstructor } from '../implementations/constructors/augmentations/getSettingGroupConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Setting group.
   *
   * @since 1.11.0
   */
  interface SettingGroup {
    /**
     * The components of the setting group.
     *
     * @unofficial
     */
    components: BaseComponent[];

    /**
     * The control element of the setting group.
     *
     * @unofficial
     */
    controlEl: HTMLDivElement;

    /**
     * The group element of the setting group.
     *
     * @unofficial
     */
    groupEl: HTMLDivElement;

    /**
     * The header element of the setting group.
     *
     * @unofficial
     */
    headerEl: HTMLDivElement;

    /**
     * The header inner element of the setting group.
     *
     * @unofficial
     */
    headerInnerEl: HTMLDivElement;

    /**
     * The list element of the setting group.
     *
     * @public
     * @since 1.11.0
     * @official
     */
    listEl: HTMLElement;

    /**
     * Add CSS classes to the setting group.
     *
     * @param classes - The CSS classes to add.
     * @returns The setting group.
     * @example
     * ```ts
     * settingGroup.addClass('foo', 'bar');
     * ```
     * @official
     * @since 1.11.0
     */
    addClass(...classes: string[]): this;

    /**
     * Add an extra button to the setting group.
     *
     * @param cb - the callback function.
     * @returns the setting group.
     * @official
     * @since 1.11.0
     */
    addExtraButton(cb: (component: ExtraButtonComponent) => unknown): this;

    /**
     * Add a search input at the beginning of the setting group. Useful for filtering
     * results or adding an input for quick entry.
     *
     * @param cb - the callback function.
     * @returns the setting group.
     * @official
     * @since 1.11.0
     */
    addSearch(cb: (component: SearchComponent) => unknown): this;

    /**
     * Adds a search control to the setting group's header.
     *
     * @param cb - Callback receiving the created control element.
     * @returns The setting group.
     * @unofficial
     */
    addSearchControl(cb: (el: HTMLElement) => void): this;

    /**
     * Add a setting to the setting group.
     *
     * @param cb - The callback to add the setting.
     * @returns The setting group.
     * @example
     * ```ts
     * settingGroup.addSetting((setting) => {
     *     setting.setName('foo');
     * });
     * ```
     * @official
     * @since 1.11.0
     */
    addSetting(cb: (setting: Setting) => void): this;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getSettingGroupConstructor} from `obsidian-typings/implementations`.
     *
     * @param containerEl - The container element.
     * @returns The setting group.
     * @official
     * @since 1.11.0
     * @deprecated - Added only for typing purposes.
     */
    constructor__(containerEl: HTMLElement): this;

    /**
     * Focuses the nearest visible item at or after the given index.
     *
     * @param index - The index to start searching from.
     * @unofficial
     */
    focusNearestItem(index: number): void;

    /**
     * Registers a handler invoked when an item is deleted via the keyboard.
     *
     * @param cb - Callback receiving the deleted item's index.
     * @returns The setting group.
     * @unofficial
     */
    onDeleteItem(cb: (index: number) => void): this;

    /**
     * Registers a handler invoked when an item is reordered via the keyboard.
     *
     * @param cb - Callback receiving the source and destination indices.
     * @returns The setting group.
     * @unofficial
     */
    onReorderItem(cb: (fromIndex: number, toIndex: number) => void): this;

    /**
     * Set the heading of the setting group.
     *
     * @param text - The text to set the heading to.
     * @returns The setting group.
     * @example
     * ```ts
     * settingGroup.setHeading('foo');
     * ```
     * @official
     * @since 1.11.0
     */
    setHeading(text: DocumentFragment | string): this;
  }
}
