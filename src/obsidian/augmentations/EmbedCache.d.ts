export {};

declare module 'obsidian' {
    /**
     * The cache of the embed in the note.
     *
     * ```markdown
     * ![[wikilink]]
     * ![[wikilink|alias]]
     * ![alias](markdown-link)
     * ```
     */
    interface EmbedCache extends ReferenceCache {
    }
}
