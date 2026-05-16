import type { WebviewTag } from '../../../electron/internals/WebviewTag.d.ts';

export {};

declare global {
  /**
   * Electron WebView tag for embedding external web content.
   *
   * @unofficial
   */
  var WebView: WebviewTag;
}
