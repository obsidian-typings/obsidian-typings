import type {
    getMenuSeparatorConstructor
} from '../implementations/constructors/augmentations/getMenuSeparatorConstructor.d.ts';

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
         * To get the constructor instance, use {@link getMenuSeparatorConstructor} from `obsidian-typings/implementations`.
         *
         * @param menu - The menu.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(menu: Menu): this;
    }
}
