export {};

declare module 'obsidian' {
    /**
     * Markdown section information.
     */
    interface MarkdownSectionInformation {
        /**
         * The end line of the section (0-based).
         *
         * @official
         */
        lineEnd: number;

        /**
         * The start line of the section (0-based).
         *
         * @official
         */
        lineStart: number;

        /**
         * The text of the section.
         *
         * @official
         */
        text: string;
    }
}
