export {};

declare module 'obsidian' {
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
         * Executes the callback of the onClick event (if not disabled).
         *
         * @param e - Mouse or keyboard event.
         *
         * @unofficial
         */
        handleEvent(e: MouseEvent | KeyboardEvent): void;
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
         *
         * @deprecated
         * @unofficial
         */
        setActive(active: boolean): this;
        /**
         * Create a submenu on the menu item.
         *
         * @tutorial Creates the foldable menus with more options as seen when you right-click in the editor (e.g. 'Insert', 'Format', ...).
         *
         * @unofficial
         */
        setSubmenu(): Menu;
        /**
         * Add warning styling to the menu item.
         *
         * @param warning - Whether the menu item should be styled as a warning.
         *
         * @unofficial
         */
        setWarning(warning: boolean): this;
    }
}
