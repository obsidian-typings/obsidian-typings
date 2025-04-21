export {};

declare module 'obsidian' {
    /**
     * The information about the frontmatter in the note.
     */
    interface FrontMatterInfo {
        /**
         * Offset where the frontmatter block ends (including the ---)
         *
         * @official
         */
        contentStart: number;

        /**
         * Whether this file has a frontmatter block.
         *
         * @official
         */
        exists: boolean;

        /**
         * Start offset of the frontmatter contents (excluding the ---).
         *
         * @official
         */
        from: number;

        /**
         * String representation of the frontmatter.
         *
         * @official
         */
        frontmatter: string;

        /**
         * End offset of the frontmatter contents (excluding the ---).
         *
         * @official
         */
        to: number;
    }
}
