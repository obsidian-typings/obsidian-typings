export {};

declare module "obsidian" {
    interface MenuItem {
        /**
         * The callback that is executed when the menu item is clicked
         */
        callback?: () => void;
        /**
         * Whether the menu item is checked
         */
        checked: boolean | null;
        /**
         * Check icon element of the menu item, only present if the item is checked
         */
        checkIconEl?: HTMLElement;
        /**
         * Whether the menu item is disabled
         */
        disabled: boolean;
        /**
         * Dom element of the menu item
         */
        dom: HTMLElement;
        /**
         * Icon element of the menu item
         */
        iconEl: HTMLElement;
        /**
         * Menu the item is in
         */
        menu: Menu;
        /**
         * The section the item belongs to
         */
        section: string;
        /**
         * The submenu that is attached to the item
         */
        submenu: Menu | null;
        /**
         * Title of the menu item
         */
        titleEl: string;

        /**
         * @param e - Mouse or keyboard event
         * @internal Executes the callback of the onClick event (if not disabled)
         */
        handleEvent(e: MouseEvent | KeyboardEvent): void;
        /** @internal Remove the icon element from the menu item */
        removeIcon(): void;
        /**
         * @deprecated
         * @param active - Whether the menu item should be checked
         * @internal Calls `setChecked`, prefer usage of that function instead
         */
        setActive(active: boolean): this;
        /**
         * Create a submenu on the menu item
         *
         * @tutorial Creates the foldable menus with more options as seen when you right-click in the editor (e.g. "Insert", "Format", ...)
         */
        setSubmenu(): Menu;
        /**
         * @param warning - Whether the menu item should be styled as a warning
         * @internal Add warning styling to the menu item
         */
        setWarning(warning: boolean): this;
    }
}
