import type { MenuSubmenuConfigRecord } from '../internals/MenuSubmenuConfigRecord.d.ts';
import type { Submenu } from '../internals/Submenu.d.ts';

export {};

declare module 'obsidian' {
    interface Menu extends Component, CloseableComponent {
        /**
         * Background for the suggestion menu.
         *
         * @unofficial
         */
        bgEl: HTMLElement;

        /**
         * The currently active submenu, if any.
         *
         * @unofficial
         */
        currentSubmenu?: Menu;

        /**
         * DOM element of the menu.
         *
         * @unofficial
         */
        dom: HTMLElement;

        /**
         * Items contained in the menu.
         *
         * @unofficial
         */
        items: MenuItem[];

        /**
         * Parent menu of the current menu.
         *
         * @unofficial
         */
        parentMenu: Menu | null;

        /**
         * Scope in which the menu is active.
         *
         * @unofficial
         */
        scope: Scope;

        /**
         * Sections within the menu.
         *
         * @unofficial
         */
        sections: string[];

        /**
         * Which menuitem is currently selected.
         *
         * @unofficial
         */
        selected: number;

        /**
         * Configurations for the submenu configs.
         *
         * @unofficial
         */
        submenuConfig: MenuSubmenuConfigRecord;

        /**
         * Whether the submenu is currently unloading.
         *
         * @unofficial
         */
        unloading: boolean;

        /**
         * Whether the menu is rendered in native mode.
         *
         * @unofficial
         */
        useNativeMenu: boolean;

        /**
         * Add a section to the menu.
         *
         * @unofficial
         */
        addSections(items: string[]): this;

        /**
         * Close the currently open submenu.
         *
         * @unofficial
         */
        closeSubmenu(): void;

        /**
         * Callback to execute when the menu is hidden.
         *
         * @unofficial
         */
        hideCallback(): void;

        /**
         * Check whether the clicked element is inside the menu.
         *
         * @unofficial
         */
        isInside(e: HTMLElement): boolean;

        /**
         * Move selection to the next item in the menu.
         *
         * @param e - Keyboard event.
         * @unofficial
         */
        onArrowDown(e: KeyboardEvent): boolean;

        /**
         * Move selection out of the submenu.
         *
         * @unofficial
         */
        onArrowLeft(e: KeyboardEvent): boolean;

        /**
         * Move selection into the submenu.
         *
         * @unofficial
         */
        onArrowRight(e: KeyboardEvent): boolean;

        /**
         * Move selection to the previous item in the menu.
         *
         * @param e - Keyboard event.
         * @unofficial
         */
        onArrowUp(e: KeyboardEvent): boolean;

        /**
         * Execute selected menu item (does nothing if item is submenu).
         *
         * @param e - Keyboard event.
         * @unofficial
         */
        onEnter(e: KeyboardEvent): boolean;

        /**
         * Preemptively closes the menu if click is registered on menu item.
         *
         * @param e - Mouse event.
         * @unofficial
         */
        onMenuClick(e: MouseEvent): void;

        /**
         * Opens submenu if mouse is hovering over item with submenu.
         *
         * @param e - Mouse event.
         * @unofficial
         */
        onMouseOver(e: MouseEvent): boolean;

        /**
         * Registers dom events and scope for the menu.
         *
         * @param item - Menu item.
         * @unofficial
         */
        openSubmenu(item: MenuItem): void;

        /**
         * Callback that opens the submenu after a delay.
         *
         * @unofficial
         */
        openSubmenuSoon(): void;

        /**
         * Select the item at the specified index (after either hovering or arrowing over it).
         *
         * @param index - Index of the item to select.
         * @unofficial
         */
        select(index: number): void;

        /**
         * Set the parent element of the menu (i.e. for workspace leaf context menu).
         *
         * @param el - Element to set as parent.
         * @unofficial
         */
        setParentElement(el: HTMLElement): this;

        /**
         * Add a section to the submenu config.
         *
         * @param section - Section to add.
         * @param submenu - Submenu to add.
         * @unofficial
         */
        setSectionSubmenu(section: string, submenu: Submenu): this;

        /**
         * Sort the items in the menu.
         *
         * @unofficial
         */
        sort(): void;

        /**
         * Unselect the currently selected item and closes the submenu.
         *
         * @unofficial
         */
        unselect(): void;
    }
}
