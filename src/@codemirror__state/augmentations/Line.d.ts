export {};

declare module '@codemirror/state' {
  interface Line {
    /**
     * The position of the start of the line.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link from} instead.
     */
    readonly from__: number;

    /**
     * This line's line number (1-based).
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link number} instead.
     */
    readonly number__: number;

    /**
     * The line's content.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link text} instead.
     */
    readonly text__: string;

    /**
     * The position at the end of the line (before the line break, or at the end of document
     * for the last line).
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link to} instead.
     */
    readonly to__: number;

    /**
     * The length of the line (not including any line break after it).
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link length} instead.
     */
    get length__(): number;
  }
}
