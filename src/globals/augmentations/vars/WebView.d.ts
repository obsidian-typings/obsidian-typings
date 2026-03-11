import type { WebviewTag } from 'electron';

export {};

declare global {
  /**
   * Electron WebView tag for embedding external web content.
   * @unofficial
   */
  const WebView: WebviewTag;
}
