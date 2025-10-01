export {};

declare module 'obsidian' {
    /**
     * Cached metadata for a note.
     */
    interface CachedMetadata {
        /**
         * The cache of the blocks in the note.
         *
         * ```markdown
         * foo ^bar
         * ```
         *
         * @official
         */
        blocks?: Record<string, BlockCache>;

        /**
         * The cache of the embeds in the note.
         *
         * ```markdown
         * ![[wikilink]]
         * ![[wikilink|alias]]
         * ![alias](markdown-link)
         * ```
         *
         * @official
         */
        embeds?: EmbedCache[];

        /**
         * The cache of the footnote references in the note.
         *
         * ```markdown
         * foo [^1]
         *
         * [^1]: bar
         *
         * baz [^qux]
         *
         * [^qux]: quux
         * ```
         *
         * @official
         * @since 1.8.7
         */
        footnoteRefs?: FootnoteRefCache[];

        /**
         * The cache of the footnotes in the note.
         *
         * ```markdown
         * foo [^1]
         *
         * [^1]: bar
         *
         * baz [^qux]
         *
         * [^qux]: quux
         * ```
         *
         * @official
         * @since 1.6.6
         */
        footnotes?: FootnoteCache[];

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
         *
         * @official
         */
        frontmatter?: FrontMatterCache;

        /**
         * The cache of the links in the frontmatter.
         *
         * ```markdown
         * ---
         * key1: "[[wikilink]]"
         * key2: "[[wikilink|alias]]"
         * ---
         * ```
         *
         * @official
         * @since 1.4.0
         */
        frontmatterLinks?: FrontmatterLinkCache[];

        /**
         * Position of the frontmatter in the file.
         *
         * ```markdown
         * ---
         * key1: "value1",
         * key2: 42
         * ---
         *
         * ```
         *
         * @official
         * @since 1.4.0
         */
        frontmatterPosition?: Pos;

        /**
         * The cache of the headings in the note.
         *
         * ```markdown
         * # foo
         * ## bar
         * ### baz
         * ```
         *
         * @official
         */
        headings?: HeadingCache[];

        /**
         * The cache of the links in the note.
         *
         * ```markdown
         * [[wikilink]]
         * [[wikilink|alias]]
         * [alias](markdown-link)
         * ```
         *
         * @official
         */
        links?: LinkCache[];

        /**
         * The cache of the list items in the note.
         * List items are markdown blocks that are used to create lists.
         *
         * ```markdown
         * - Unordered List Item 1
         * - Unordered List Item 2
         * - Unordered List Item 3
         *
         * 1. Ordered List Item 1
         * 2. Ordered List Item 2
         * 3. Ordered List Item 3
         * ```
         *
         * @official
         */
        listItems?: ListItemCache[];

        /**
         * The cache of the reference links in the note.
         *
         * ```markdown
         * [google]
         *
         * [google]: https://google.com
         * ```
         *
         * @official
         * @since 1.8.7
         */
        referenceLinks?: ReferenceLinkCache[];

        /**
         * The cache of the sections in the note.
         * Sections are root level markdown blocks, which can be used to divide the document up.
         *
         * ```markdown
         * # Heading section
         *
         * Paragraph section
         *
         * > [!NOTE]
         * > Callout section
         * ```
         *
         * @official
         */
        sections?: SectionCache[];

        /**
         * The cache of the tags in the note.
         *
         * ```markdown
         * ---
         * tags:
         *   - foo
         *   - bar
         * ---
         *
         * #baz
         * ```
         *
         * @official
         */
        tags?: TagCache[];
    }
}
