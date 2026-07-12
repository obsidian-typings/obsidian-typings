import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * The `webContents` module accessor exposed by Electron, providing static factory and lookup methods for `WebContents` instances.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebContentsModule {
  /**
   * Looks up a `WebContents` instance based on its assigned Chrome DevTools Protocol TargetID.
   *
   * @param targetId - The Chrome DevTools Protocol TargetID to look up.
   * @returns A `WebContents` instance with the given TargetID, or `undefined` if there is no `WebContents` associated with the given TargetID.
   */
  fromDevToolsTargetId(targetId: string): ElectronWebContents | undefined;

  /**
   * Looks up a `WebContents` instance based on a `WebFrameMain`.
   *
   * @param frame - The `WebFrameMain` to look up.
   * @returns A `WebContents` instance with the given `WebFrameMain`, or `undefined` if there is no `WebContents` associated with the given `WebFrameMain`.
   */
  fromFrame(frame: ElectronWebFrameMain): ElectronWebContents | undefined;

  /**
   * Looks up a `WebContents` instance based on its ID.
   *
   * @param id - The ID to look up.
   * @returns A `WebContents` instance with the given ID, or `undefined` if there is no `WebContents` associated with the given ID.
   */
  fromId(id: number): ElectronWebContents | undefined;

  /**
   * Returns an array of all `WebContents` instances. This will contain web contents for all windows, webviews, opened devtools, and devtools extension background pages.
   *
   * @returns An array of all `WebContents` instances.
   */
  getAllWebContents(): ElectronWebContents[];

  /**
   * Returns the web contents that is focused in this application, otherwise returns `null`.
   *
   * @returns The focused `WebContents`, or `null` if none is focused.
   */
  getFocusedWebContents(): ElectronWebContents | null;
}
