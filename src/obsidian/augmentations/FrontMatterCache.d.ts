export {};

declare module 'obsidian' {
    /**
     * The cache of the frontmatter in the note.
     * Frontmatter is a block of metadata that is used to store information about the note.
     *
     * ```markdown
     * ---
     * key1: "value1",
     * key2: 42
     * ---
     * ```
     */
    interface FrontMatterCache {
        /**
         * The key-value pairs in the frontmatter.
         *
         * @example
         * ```ts
         * console.log(frontmatterCache['key1']); // value1
         * console.log(frontmatterCache['key2']); // 42
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use `this[key]` instead.
         */
        index__(key: string): any;
    }
}
