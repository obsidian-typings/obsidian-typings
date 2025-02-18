export {};

declare module 'obsidian' {
    interface Reference {
        /** @internal dot delimetered, e.g., `symlink.0`, path in the frontmatter to the reference */
        key?: string;
    }
}
