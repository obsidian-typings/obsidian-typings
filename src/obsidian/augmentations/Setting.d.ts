export {};

declare module 'obsidian' {
    /**
     * A setting.
     */
    interface Setting {
        /**
         * The components for the setting.
         *
         * @official
         */
        components: BaseComponent[];

        /**
         * The HTML element for the control.
         *
         * @official
         */
        controlEl: HTMLElement;

        /**
         * The HTML element for the description.
         *
         * @official
         */
        descEl: HTMLElement;

        /**
         * The HTML element for the info.
         *
         * @official
         */
        infoEl: HTMLElement;

        /**
         * The HTML element for the name.
         *
         * @official
         */
        nameEl: HTMLElement;

        /**
         * The HTML element for the setting.
         *
         * @official
         */
        settingEl: HTMLElement;

        /**
         * Add a button to the setting.
         *
         * @param cb - The callback to add the button.
         * @returns The setting.
         * @example
         * ```ts
         * setting.addButton((button) => {
         *     button.setText('foo');
         * });
         * ```
         * @official
         */
        addButton(cb: (component: ButtonComponent) => any): this;

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
        addColorPicker(cb: (component: ColorComponent) => any): this;

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
        addDropdown(cb: (component: DropdownComponent) => any): this;

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
         */
        addExtraButton(cb: (component: ExtraButtonComponent) => any): this;

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
         */
        addMomentFormat(cb: (component: MomentFormatComponent) => any): this;

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
        addProgressBar(cb: (component: ProgressBarComponent) => any): this;

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
         */
        addSearch(cb: (component: SearchComponent) => any): this;

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
         */
        addSlider(cb: (component: SliderComponent) => any): this;

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
         */
        addText(cb: (component: TextComponent) => any): this;

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
         */
        addTextArea(cb: (component: TextAreaComponent) => any): this;

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
         */
        addToggle(cb: (component: ToggleComponent) => any): this;

        /**
         * Clear the setting.
         *
         * @returns The setting.
         * @example
         * ```ts
         * setting.clear();
         * ```
         * @official
         */
        clear(): this;

        /**
         * Create a new setting.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

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
         */
        setDesc(desc: string | DocumentFragment): this;

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
         */
        setDisabled(disabled: boolean): this;

        /**
         * Make the setting a heading.
         *
         * @returns The setting.
         * @example
         * ```ts
         * setting.setHeading();
         * ```
         * @official
         */
        setHeading(): this;

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
         */
        setName(name: string | DocumentFragment): this;

        /**
         * Hide the info section of the setting.
         *
         * @unofficial
         */
        setNoInfo(): this;

        /**
         * Set the tooltip of the setting.
         *
         * @param tooltip - The tooltip of the setting.
         * @returns The setting.
         * @example
         * ```ts
         * setting.setTooltip('foo');
         * ```
         * @official
         */
        setTooltip(tooltip: string, options?: TooltipOptions): this;

        /**
         * Shows/hides the setting.
         *
         * @param visible Whether the setting should be visible.
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
         */
        then(cb: (setting: this) => any): this;
    }
}
