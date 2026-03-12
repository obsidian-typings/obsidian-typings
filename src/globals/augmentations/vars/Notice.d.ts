import type { Notice as NoticeInstance } from 'obsidian';

export {};

declare global {
  /**
   * Notification component. Use to present timely, high-value information.
   *
   * @unofficial
   */
  var Notice: typeof NoticeInstance;
}
