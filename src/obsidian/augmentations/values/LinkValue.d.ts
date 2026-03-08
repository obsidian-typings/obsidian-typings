export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping an internal wikilink.
     *
     * @since 1.10.0
     */
    interface LinkValue extends StringValue {
    }

    namespace LinkValue {
        /**
         * Create a new LinkValue from wikilink syntax.
         *
         * @param app - The app instance.
         * @param input - The wikilink syntax.
         * @param sourcePath - The source path.
         * @returns The new LinkValue.
         *
         * @example
         * ```typescript
         * parseFromString("[[Welcome|Example Link]]")
         * ```
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link LinkValue.parseFromString} instead.
         */
        function parseFromString__(app: App, input: string, sourcePath: string): LinkValue | null;
    }
}
