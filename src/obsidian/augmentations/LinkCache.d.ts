export {};

declare module 'obsidian' {
    /**
     * The cache of the link in the note.
     *
     * ```markdown
     * [[wikilink]]
     * [[wikilink|alias]]
     * [alias](markdown-link)
     * ```
     */
    interface LinkCache extends ReferenceCache {
    }
}
