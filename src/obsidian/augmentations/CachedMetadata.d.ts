export {};

declare module 'obsidian' {
    interface CachedMetadata {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        footnotes?: FootnoteCache[];
    }
}
