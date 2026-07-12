/**
 * Options for {@link ElectronBrowserWindow.setProgressBar}.
 *
 * @public
 * @unofficial
 */
export interface ElectronProgressBarOptions {
  /**
   * Mode for the progress bar (Windows only).
   */
  mode: 'error' | 'indeterminate' | 'none' | 'normal' | 'paused';
}
