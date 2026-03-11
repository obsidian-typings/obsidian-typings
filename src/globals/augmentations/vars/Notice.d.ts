import type { Notice } from 'obsidian';

export {};

declare global {
  /**
   * Notification component. Use to present timely, high-value information.
   *
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link Notice} instead.
   */
  const Notice__: typeof Notice;
}
