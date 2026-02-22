export {};

declare module 'obsidian' {
    /**
     * A map of CLI flags.
     *
     * @deprecated - Added only for typing purposes. Use {@link CliFlag} instead.
     */
    type CliFlags__ = Record<string, CliFlag>;
}
