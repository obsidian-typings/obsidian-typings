import type { moment as momentInstance } from 'obsidian';

export {};

declare module 'obsidian' {
  /**
   * An instance of `Moment.js` library.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link moment} instead.
   */
  const moment__: typeof momentInstance;
}
