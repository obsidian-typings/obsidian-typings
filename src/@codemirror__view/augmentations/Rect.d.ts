export {};

declare module '@codemirror/view' {
  interface Rect {
    /**
     * The bottom position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link bottom} instead.
     */
    readonly bottom__: number;

    /**
     * The left position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link left} instead.
     */
    readonly left__: number;

    /**
     * The right position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link right} instead.
     */
    readonly right__: number;

    /**
     * The top position.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link top} instead.
     */
    readonly top__: number;
  }
}
