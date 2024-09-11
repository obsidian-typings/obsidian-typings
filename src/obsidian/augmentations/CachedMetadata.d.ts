export {};

declare module 'obsidian' {
    interface CachedMetadata {
        footnotes?: FootnoteCache[];
    }
}
