import type { Direction } from '@codemirror/view';

export {};

declare module '@codemirror/view' {
  interface BidiSpan {
    /**
     * The start of the span (relative to the start of the line).
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link from} instead.
     */
    readonly from__: number;

    /**
     * The bidi level of the span.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link level} instead.
     */
    readonly level__: number;

    /**
     * The end of the span.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link to} instead.
     */
    readonly to__: number;

    /**
     * The direction of this span.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link dir} instead.
     */
    get dir__(): Direction;
  }
}
