export {};

declare module 'obsidian' {
  /**
   * Logical sidedock identity, independent of screen position. In LTR, `'primary'`
   * renders on the left and `'secondary'` on the right; RTL mirrors them.
   * `'left'` and `'right'` are legacy aliases for `'primary'` and `'secondary'`.
   *
   * @deprecated - Added only for typing purposes. Use {@link Side} instead.
   */
  type Side__ = 'left' | 'primary' | 'right' | 'secondary';
}
