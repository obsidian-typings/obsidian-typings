export {};

declare module 'obsidian' {
    /**
     * The cache of the links in the frontmatter.
     *
     * ```markdown
     * ---
     * key1: "[[wikilink]]"
     * key2: "[[wikilink|alias]]"
     * ---
     * ```
     */
    interface FrontmatterLinkCache extends Reference {
        /**
         * The key of the link.
         *
         * @example
         * ```ts
         * console.log(frontmatterLinkCache.key); // key1
         * console.log(frontmatterLinkCache.key); // key2
         * ```
         * @official
         */
        key: string;
    }
}
