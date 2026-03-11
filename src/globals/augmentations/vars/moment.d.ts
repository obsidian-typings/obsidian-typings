import type { moment } from 'obsidian';

export {};

declare global {
  /**
   * Parse, validate, manipulate, and display dates in javascript.
   *
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link moment} instead.
   */
  const moment__: typeof moment;
}
