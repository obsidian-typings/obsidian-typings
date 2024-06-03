export { };

declare module "obsidian" {
    interface Menu extends Component {
        /**
         * Background for the suggestion menu
         */
        bgEl: HTMLElement;
        /**
         * The currently active submenu, if any
         */
        currentSubmenu?: Menu;
        /**
         * DOM element of the menu
         */
        dom: HTMLElement;
        /**
         * Callback to execute when the menu is hidden
         */
        hideCallback: () => void;
        /**
         * Items contained in the menu
         */
        items: MenuItem[];
        /** @internal Callback that opens the submenu after a delay */
        openSubmenuSoon: () => void;
        /**
         * Parent menu of the current menu
         */
        parentMenu: Menu | null;
        /**
         * Scope in which the menu is active
         */
        scope: Scope;
        /**
         * Sections within the menu
         */
        sections: string[];
        /** @internal Which menuitem is currently selected */
        selected: number;
        /** @internal Configurations for the submenu configs */
        submenuConfig: Record<string, { title: string; icon: string; }>;
        /** @internal Whether the submenu is currently unloading */
        unloading: boolean;
        /**
         * Whether the menu is rendered in native mode
         */
        useNativeMenu: boolean;

        /** @internal Add a section to the menu */
        addSections(items: string[]): this;
        /** @internal Close the currently open submenu */
        closeSubmenu(): void;
        /** @internal Check whether the clicked element is inside the menu */
        isInside(e: HTMLElement): boolean;
        /**
         * @param e - Keyboard event
         * @internal Move selection to the next item in the menu
         */
        onArrowDown(e: KeyboardEvent): boolean;
        /** @internal Move selection out of the submenu */
        onArrowLeft(e: KeyboardEvent): boolean;
        /** @internal Move selection into the submenu */
        onArrowRight(e: KeyboardEvent): boolean;
        /**
         * @param e - Keyboard event
         * @internal Move selection to the previous item in the menu
         */
        onArrowUp(e: KeyboardEvent): boolean;
        /** @internal Execute selected menu item (does nothing if item is submenu) */
        onEnter(e: KeyboardEvent): boolean;
        /**
         * @param e
         * @internal Preemptively closes the menu if click is registered on menu item
         */
        onMenuClick(e: MouseEvent): void;
        /**
         * @param e - Mouse event
         * @internal Opens submenu if mouse is hovering over item with submenu
         */
        onMouseOver(e: MouseEvent): boolean;
        /** @internal Registers dom events and scope for the menu */
        openSubmenu(item: MenuItem): void;
        /**
         * @param index
         * @internal Select the item at the specified index (after either hovering or arrowing over it)
         */
        select(index: number): void;
        /**
         * @param el - Element to set as parent
         * @internal Set the parent element of the menu (i.e. for workspace leaf context menu)
         */
        setParentElement(el: HTMLElement): this;
        /**
         * @param section
         * @param submenu
         * @internal Add a section to the submenu config
         */
        setSectionSubmenu(section: string, submenu: { title: string; icon: string; }): this;
        /** @internal Sort the items in the menu */
        sort(): void;
        /** @internal Unselect the currently selected item and closes the submenu */
        unselect(): void;
    }
}
