export {};

declare module 'obsidian' {
    /**
     * Base interface for items that point to a different location.
     */
    interface Reference {
        /**
         * Display text of the link.
         *
         * @example
         * For the following links:
         *
         * ```md
         * [[foo|bar]]
         * [[foo]]
         * [foo](bar.md)
         * ![](bar.jpg)
         * ```
         *
         * `displayText` will be:
         *
         * ```
         * 'bar'
         * 'foo'
         * 'foo'
         * ''
         * ```
         * @official
         */
        displayText?: string;

        /**
         * Link destination.
         *
         * @official
         */
        link: string;

        /**
         * Contains the text as it's written in the document. Not available on Publish.
         *
         * @official
         */
        original: string;
    }
}
