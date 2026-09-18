import type { getSettingConstructor } from '../implementations/constructors/augmentations/getSettingConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A setting.
   *
   * @since 0.9.7
   */
  interface Setting {
    /**
     * The components for the setting.
     *
     * @official
     * @since 0.9.7
     */
    components: BaseComponent[];

    /**
     * The HTML element for the control.
     *
     * @official
     * @since 0.9.7
     */
    controlEl: HTMLElement;

    /**
     * The HTML element for the description.
     *
     * @official
     * @since 0.9.7
     */
    descEl: HTMLElement;

    /**
     * Whether the setting row is disabled. Initialized to `false`, written only by
     * {@link Setting.setDisabled}, and read as its guard by the row-click listener that
     * {@link Setting.setRowClick} attaches, so a disabled row does not invoke {@link Setting.rowClick}.
     *
     * @unofficial
     */
    disabled: boolean;

    /**
     * Error message element shown below the input. Created by {@link setErrorMessage}.
     *
     * @official
     * @since 1.13.0
     */
    errorEl: HTMLElement | null;

    /**
     * The HTML element for the icon, prepended to {@link Setting.settingEl}. Created by
     * {@link Setting.setIcon} on its first call, and `null` until then.
     *
     * @unofficial
     */
    iconEl: HTMLDivElement | null;

    /**
     * The HTML element for the info.
     *
     * @official
     * @since 0.9.7
     */
    infoEl: HTMLElement;

    /**
     * The HTML element for the name.
     *
     * @official
     * @since 0.9.7
     */
    nameEl: HTMLElement;

    /**
     * The click handler for the setting row, stored by {@link Setting.setRowClick} and invoked by the
     * listener it attaches. `null` until that first call.
     *
     * @unofficial
     */
    rowClick: (() => void) | null;

    /**
     * The HTML element for the setting.
     *
     * @official
     * @since 0.9.7
     */
    settingEl: HTMLElement;

    /**
     * Add a button to the setting.
     *
     * @param cb - The callback to add the button.
     * @returns The setting.
     * To get the constructor instance, use {@link getSettingConstructor} from `obsidian-typings/implementations`.
     * @example
     * ```ts
     * setting.addButton((button) => {
     *     button.setText('foo');
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    addButton(cb: (component: ButtonComponent) => unknown): this;

    /**
     * Add a color picker component to the setting.
     *
     * @param cb - The callback to add the color picker component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addColorPicker((colorPicker) => {
     *     colorPicker.setValue('#000000');
     * });
     * ```
     * @official
     */
    addColorPicker(cb: (component: ColorComponent) => unknown): this;

    /**
     * Add a component to the setting.
     *
     * @param cb - The callback to add the component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addComponent((el) => {
     *     return new TextComponent(el);
     * });
     * ```
     * @official
     * @since 1.11.0
     */
    addComponent<T extends BaseComponent>(cb: (el: HTMLElement) => T): this;

    /**
     * Add a read-only display value to the row. On a navigable row, this
     * surfaces the value edited on the page the row opens, so the user can see
     * it without opening that page.
     *
     * @param cb - The callback to add the display value component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addDisplayValue((displayValue) => {
     *     displayValue.setValue('foo');
     * });
     * ```
     * @official
     * @since 1.13.1
     */
    addDisplayValue(cb: (component: DisplayValueComponent) => unknown): this;

    /**
     * Add a dropdown component to the setting.
     *
     * @param cb - The callback to add the dropdown component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addDropdown((dropdown) => {
     *     dropdown.addOption('foo', 'bar');
     * });
     * ```
     * @official
     */
    addDropdown(cb: (component: DropdownComponent) => unknown): this;

    /**
     * Add an extra button to the setting.
     *
     * @param cb - The callback to add the extra button.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addExtraButton((extraButton) => {
     *     extraButton.setIcon('dice');
     * });
     * ```
     * @official
     * @since 0.9.16
     */
    addExtraButton(cb: (component: ExtraButtonComponent) => unknown): this;

    /**
     * Add a moment format component to the setting.
     *
     * @param cb - The callback to add the moment format component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addMomentFormat((momentFormat) => {
     *     momentFormat.setValue('YYYY-MM-DD');
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    addMomentFormat(cb: (component: MomentFormatComponent) => unknown): this;

    /**
     * Add a progress bar component to the setting.
     *
     * @param cb - The callback to add the progress bar component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addProgressBar((progressBar) => {
     *     progressBar.setValue(50);
     * });
     * ```
     * @official
     */
    addProgressBar(cb: (component: ProgressBarComponent) => unknown): this;

    /**
     * Add a search component to the setting.
     *
     * @param cb - The callback to add the search component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addSearch((search) => {
     *     search.setValue('foo');
     * });
     * ```
     * @official
     * @since 0.9.21
     */
    addSearch(cb: (component: SearchComponent) => unknown): this;

    /**
     * Add a slider component to the setting.
     *
     * @param cb - The callback to add the slider component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addSlider((slider) => {
     *     slider.setValue(50);
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    addSlider(cb: (component: SliderComponent) => unknown): this;

    /**
     * Add a text component to the setting.
     *
     * @param cb - The callback to add the text component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addText((text) => {
     *     text.setValue('foo');
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    addText(cb: (component: TextComponent) => unknown): this;

    /**
     * Add a text area component to the setting.
     *
     * @param cb - The callback to add the text area component.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addTextArea((textArea) => {
     *     textArea.setValue('foo');
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    addTextArea(cb: (component: TextAreaComponent) => unknown): this;

    /**
     * Add a toggle to the setting.
     *
     * @param cb - The callback to add the toggle.
     * @returns The setting.
     * @example
     * ```ts
     * setting.addToggle((toggle) => {
     *     toggle.setValue(true);
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    addToggle(cb: (component: ToggleComponent) => unknown): this;

    /**
     * Clear the setting.
     *
     * @returns The setting.
     * @example
     * ```ts
     * setting.clear();
     * ```
     * @official
     * @since 0.13.8
     */
    clear(): this;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getSettingConstructor} from `obsidian-typings/implementations`.
     *
     * @param containerEl - The container element.
     * @returns The setting instance.
     * @official
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(containerEl: HTMLElement): this;

    /**
     * Makes the whole setting row act as a button, invoking the callback when clicked.
     *
     * @param callback - The callback to invoke when the setting is clicked.
     * @returns The setting instance, for chaining.
     * @unofficial
     */
    setAction(callback: () => void): this;

    /**
     * Set the class of the setting.
     *
     * @param cls - The class of the setting.
     * @returns The setting.
     * @example
     * ```ts
     * setting.setClass('foo');
     * ```
     * @official
     * @since 0.9.7
     */
    setClass(cls: string): this;

    /**
     * Set the description of the setting.
     *
     * @param desc - The description of the setting.
     * @returns The setting.
     * @example
     * ```ts
     * setting.setDesc('foo');
     * ```
     * @official
     * @since 0.9.7
     */
    setDesc(desc: DocumentFragment | string): this;

    /**
     * Disable the setting.
     *
     * @param disabled - Whether to disable the setting.
     * @returns The setting.
     * @example
     * ```ts
     * setting.setDisabled(true);
     * ```
     * @official
     * @since 1.2.3
     */
    setDisabled(disabled: boolean): this;

    /**
     * Show a persistent validation error message below the setting. Pass an
     * empty string or `null` to clear it. Adds the `is-invalid` class to the
     * setting row when a message is present.
     *
     * @param message - The error message to show, or `null`/empty string to clear it.
     * @returns The setting.
     * @official
     * @since 1.13.0
     */
    setErrorMessage(message: null | string): this;

    /**
     * Make the setting a heading.
     *
     * @returns The setting.
     * @example
     * ```ts
     * setting.setHeading();
     * ```
     * @official
     * @since 0.9.16
     */
    setHeading(): this;

    /**
     * Set the icon of the setting, shown at the start of the row before the info section.
     *
     * Creates {@link Setting.iconEl} on the first call. Passing `null` or an empty string empties that
     * element instead of removing it.
     *
     * @param icon - ID of the icon, can use any icon loaded with {@link obsidian#addIcon} or from the inbuilt library.
     * @returns The setting.
     * @example
     * ```ts
     * setting.setIcon('dice');
     * ```
     * @unofficial
     */
    setIcon(icon: IconName | null): this;

    /**
     * Set the name of the setting.
     *
     * @param name - The name of the setting.
     * @returns The setting.
     * @example
     * ```ts
     * setting.setName('foo');
     *
     * const fragment = createFragment();
     * fragment.createEl('strong', { text: 'bar' });
     * setting.setName(fragment);
     * ```
     * @official
     * @since 0.12.16
     */
    setName(name: DocumentFragment | string): this;

    /**
     * Makes the setting row navigable (adds a chevron and click handling).
     *
     * @param callback - The callback to invoke when the setting is clicked.
     * @returns The setting instance, for chaining.
     * @unofficial
     */
    setNavigable(callback: () => void): this;

    /**
     * Hide the info section of the setting.
     *
     * @returns The setting instance.
     * @unofficial
     */
    setNoInfo(): this;

    /**
     * Make the whole setting row invoke a callback when clicked, storing it in
     * {@link Setting.rowClick}.
     *
     * The DOM listener is attached only on the first call, so a later call replaces the handler rather
     * than adding a second one. The stored handler is skipped while the setting is disabled, or when the
     * click has already been default-prevented.
     *
     * Unlike {@link Setting.setNavigable} and {@link Setting.setAction}, which are both implemented in
     * terms of it, this returns nothing and so does not chain.
     *
     * @param callback - The callback to invoke when the setting row is clicked.
     * @unofficial
     */
    setRowClick(callback: () => void): void;

    /**
     * Set the tooltip of the setting.
     *
     * @param tooltip - The tooltip of the setting.
     * @param options - The tooltip options.
     * @returns The setting.
     * @example
     * ```ts
     * setting.setTooltip('foo');
     * ```
     * @official
     * @since 1.1.0
     */
    setTooltip(tooltip: string, options?: TooltipOptions): this;

    /**
     * Shows/hides the setting.
     *
     * @param visible Whether the setting should be visible.
     * @returns The setting instance.
     * @unofficial
     */
    setVisibility(visible: boolean): this;

    /**
     * Facilitates chaining.
     *
     * @param cb - The callback to chain.
     * @returns The setting.
     * @example
     * ```ts
     * setting.then((x) => {
     *     x.setName('foo');
     * });
     * ```
     * @official
     * @since 0.9.20
     */
    then(cb: (setting: this) => unknown): this;
  }
}
