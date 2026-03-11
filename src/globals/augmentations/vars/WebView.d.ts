import type * as electron from 'electron';

export {};

declare global {
  /**
   * Electron WebView tag for embedding external web content.
   * @unofficial
   */
  const WebView: electron.WebviewTag;
}
