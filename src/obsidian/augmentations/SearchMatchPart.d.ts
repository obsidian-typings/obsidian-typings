export {};

declare module 'obsidian' {
    /**
     * Text position offsets within text file. Represents
     * a text range `[fromOffset, toOffset]`.
     *
     * @deprecated - Added only for typing purposes. Use {@link SearchMatchPart} instead.
     */
    type SearchMatchPart__ = [number, number];
}
