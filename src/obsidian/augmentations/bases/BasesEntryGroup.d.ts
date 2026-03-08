import type { getBasesEntryGroupConstructor } from '../../implementations/constructors/augmentations/getBasesEntryGroupConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A group of BasesEntry objects for a given value of the groupBy key.
     * If there are entries in the results which do not have a value for the
     * groupBy key, the key will be the {@link NullValue}.
     *
     * @since 1.10.0
     */
    interface BasesEntryGroup {
        /**
         * Entries in this group.
         *
         * @official
         * @since 1.10.0
         */
        entries: BasesEntry[];

        /**
         * The value of the groupBy key for this entry group.
         *
         * @official
         * @since 1.10.0
         */
        key?: Value;

        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getBasesEntryGroupConstructor} from `obsidian-typings/implementations`.
         *
         * @param entries - The entries.
         * @param key - The key.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(entries: BasesEntry[], key: unknown): this;
    
        /**
         * Whether this entry group has a non-null key.
         *
         * @returns `true` iff this entry group has a non-null key.
         * @official
         * @since 1.10.0
         */
        hasKey(): boolean;
}
}
