import type { ElectronWebviewTag } from '../../../electron/internals/ElectronWebviewTag.d.ts';

export {};

declare global {
  /**
   * Electron WebView tag for embedding external web content.
   *
   * @unofficial
   */
  var WebView: ElectronWebviewTag;
}
