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
     * @since 0.9.7
     */
    interface EmbedCache extends ReferenceCache {
    }
}
