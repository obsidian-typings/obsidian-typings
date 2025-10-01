export {};

declare module 'obsidian' {
    /**
     * A menu item.
     */
    interface MenuItem {
        /**
         * Whether the menu item is checked.
         *
         * @unofficial
         */
        checked: boolean | null;

        /**
         * Check icon element of the menu item, only present if the item is checked.
         *
         * @unofficial
         */
        checkIconEl?: HTMLElement;

        /**
         * Whether the menu item is disabled.
         *
         * @unofficial
         */
        disabled: boolean;

        /**
         * Dom element of the menu item.
         *
         * @unofficial
         */
        dom: HTMLElement;

        /**
         * Icon element of the menu item.
         *
         * @unofficial
         */
        iconEl: HTMLElement;

        /**
         * Menu the item is in.
         *
         * @unofficial
         */
        menu: Menu;

        /**
         * The section the item belongs to.
         *
         * @unofficial
         */
        section: string;

        /**
         * The submenu that is attached to the item.
         *
         * @unofficial
         */
        submenu: Menu | null;

        /**
         * Title of the menu item.
         *
         * @unofficial
         */
        titleEl: HTMLElement;

        /**
         * The callback that is executed when the menu item is clicked.
         *
         * @unofficial
         */
        callback?(): void;

        /**
         * Private constructor. Use {@link Menu.addItem} instead.
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__?(): this;

        /**
         * Executes the callback of the onClick event (if not disabled).
         *
         * @param e - Mouse or keyboard event.
         * @unofficial
         */
        handleEvent(e: MouseEvent | KeyboardEvent): void;

        /**
         * Set the callback function to be called when the menu item is clicked.
         *
         * @param callback - The callback function.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.onClick(() => {
         *     console.log('Menu item clicked');
         * });
         * ```
         * @official
         */
        onClick(callback: (evt: MouseEvent | KeyboardEvent) => any): this;

        /**
         * Remove the icon element from the menu item.
         *
         * @unofficial
         */
        removeIcon(): void;

        /**
         * Calls `setChecked`, prefer usage of that function instead.
         *
         * @param active - Whether the menu item should be checked.
         * @deprecated
         * @unofficial
         */
        setActive(active: boolean): this;

        /**
         * Set the checked state of the menu item.
         *
         * @param checked - Whether the menu item is checked.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.setChecked(true);
         * ```
         * @official
         */
        setChecked(checked: boolean | null): this;

        /**
         * Set the disabled state of the menu item.
         *
         * @param disabled - Whether the menu item is disabled.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.setDisabled(true);
         * ```
         * @official
         */
        setDisabled(disabled: boolean): this;

        /**
         * Set the icon of the menu item.
         *
         * @param icon - ID of the icon, can use any icon loaded with {@link addIcon} or from the built-in lucide library.
         * @see The Obsidian icon library includes the {@link https://lucide.dev/ Lucide icon library}, any icon name from their site will work here.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.setIcon('dice');
         * ```
         * @official
         */
        setIcon(icon: IconName | null): this;

        /**
         * Set the menu item to be a label.
         *
         * @param isLabel - Whether the menu item is a label.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.setIsLabel(true);
         * ```
         * @official
         * @since 0.15.0
         */
        setIsLabel(isLabel: boolean): this;

        /**
         * Sets the section this menu item should belong in.
         * To find the section IDs of an existing menu, inspect the DOM elements
         * to see their `data-section` attribute.
         *
         * @param section - The section of the menu item.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.setSection('danger');
         * ```
         * @official
         */
        setSection(section: string): this;

        /**
         * Create a submenu on the menu item.
         *
         * @tutorial Creates the foldable menus with more options as seen when you right-click in the editor (e.g. 'Insert', 'Format', ...).
         * @unofficial
         */
        setSubmenu(): Menu;

        /**
         * Set the title of the menu item.
         *
         * @param title - The title of the menu item.
         * @returns The menu item instance.
         * @example
         * ```ts
         * menuItem.setTitle('foo');
         *
         * const fragment = createFragment();
         * fragment.createEl('strong', { text: 'bar' });
         * menuItem.setTitle(fragment);
         * ```
         * @official
         */
        setTitle(title: string | DocumentFragment): this;

        /**
         * Add warning styling to the menu item.
         *
         * @param warning - Whether the menu item should be styled as a warning.
         * @unofficial
         * @since 0.15.0
         */
        setWarning(warning: boolean): this;
    }
}
