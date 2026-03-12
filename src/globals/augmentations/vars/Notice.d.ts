import type { Notice } from 'obsidian';

export {};

declare global {
  /**
   * Notification component. Use to present timely, high-value information.
   *
   * @unofficial
   * @deprecated - Added only for typing purposes. Use `window.Notice` or `import { Notice } from 'obsidian'` instead.
   */
  var Notice__: typeof Notice;
}
