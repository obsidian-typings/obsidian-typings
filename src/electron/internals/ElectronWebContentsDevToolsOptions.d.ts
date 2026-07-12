/**
 * Options for opening developer tools.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebContentsDevToolsOptions {
  /**
   * Whether to bring the opened DevTools window to the foreground.
   *
   * @default `true`
   */
  activate?: boolean;

  /** The mode to open DevTools in. Defaults to the last used dock state. */
  mode: 'bottom' | 'detach' | 'left' | 'right' | 'undocked';
}
