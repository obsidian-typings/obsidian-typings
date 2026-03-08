export {};

declare module 'obsidian' {
    /**
     * A separator for the menu.
     * @since 0.15.3
     */
    interface MenuSeparator {
    
        /**
         * Constructor.
         *
         * @param menu - The menu.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<MenuSeparator>` or `getMenuSeparatorConstructor()` instead.
         */
        constructor__(menu: Menu): this;
}
}
