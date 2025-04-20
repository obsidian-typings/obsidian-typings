export {};

declare module 'obsidian' {
    interface CachedMetadata {
        /** @unofficial */
        footnotes?: FootnoteCache[];
    }
}
