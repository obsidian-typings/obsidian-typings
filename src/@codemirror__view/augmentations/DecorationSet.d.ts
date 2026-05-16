import type { RangeSet } from '@codemirror/state';

export {};

declare module '@codemirror/view' {
  /**
   * A decoration set represents a collection of decorated ranges, organized for efficient
   * access and mapping.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link DecorationSet} instead.
   */
  type DecorationSet__ = RangeSet<Decoration>;
}
