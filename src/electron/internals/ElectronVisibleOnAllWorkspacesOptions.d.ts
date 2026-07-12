/**
 * Options for {@link ElectronBrowserWindow.setVisibleOnAllWorkspaces}.
 *
 * @public
 * @unofficial
 */
export interface ElectronVisibleOnAllWorkspacesOptions {
  /**
   * Calling `setVisibleOnAllWorkspaces` will by default transform the process type between `UIElementApplication`
   * and `ForegroundApplication` to ensure the correct behavior. However, this will hide the window and dock for a
   * short time every time it is called. If the window is already of type `UIElementApplication`, this
   * transformation can be bypassed by passing `true` (macOS only).
   */
  skipTransformProcessType?: boolean;

  /** Sets whether the window should be visible above fullscreen windows (macOS only). */
  visibleOnFullScreen?: boolean;
}
