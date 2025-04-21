export {};

declare module 'obsidian' {
    /**
     * Location within a Markdown document
     */
    interface Loc {
        /**
         * Column number. 0-based.
         * @official
         */
        col: number;

        /**
         * Line number. 0-based.
         * @official
         */
        line: number;

        /**
         * Number of characters from the beginning of the file.
         * @official
         */
        offset: number;
    }
}
