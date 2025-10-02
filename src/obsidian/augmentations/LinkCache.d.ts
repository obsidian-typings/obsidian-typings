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
     * @since 0.9.7
     */
    interface LinkCache extends ReferenceCache {
    }
}
