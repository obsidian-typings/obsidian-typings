export {};

declare module 'obsidian' {
    /**
     * The three valid "sources" of a property in a Base.
     *
     * - `note`: Properties from the frontmatter of markdown files in the vault.
     * - `formula`: Properties calculated by evaluating a formula from the base config file.
     * - `file`: Properties inherent to a file, such as the name, extension, size, etc.
     *
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link BasesPropertyType} instead.
     */
    type BasesPropertyType__ = 'note' | 'formula' | 'file';
}
