export {};

declare module 'obsidian' {
    /**
     * A result of a subpath search.
     */
    interface SubpathResult {
        /**
         * The end location of the subpath.
         *
         * @official
         */
        end: Loc | null;

        /**
         * The start location of the subpath.
         *
         * @official
         */
        start: Loc;
    }
}
