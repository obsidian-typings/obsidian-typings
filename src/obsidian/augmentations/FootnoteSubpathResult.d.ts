export {};

declare module 'obsidian' {
    /**
     * Result of resolving footnotes using {@link resolveSubpath}
     */
    interface FootnoteSubpathResult extends SubpathResult {
        /**
         * The found footnote.
         *
         * @official
         */
        footnote: FootnoteCache;

        /**
         * The type of the subpath result.
         *
         * @official
         */
        type: 'footnote';
    }
}
