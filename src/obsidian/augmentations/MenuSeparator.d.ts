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
         * To get the constructor, use `getMenuSeparatorConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(menu: Menu): this;
}
}
