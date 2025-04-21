export {};

declare module 'obsidian' {
    /**
     * Describes a text range in a Markdown document.
     */
    interface Pos {
        /**
         * End location.
         *
         * @official
         */
        end: Loc;

        /**
         * Starting location.
         *
         * @official
         */
        start: Loc;
    }
}
