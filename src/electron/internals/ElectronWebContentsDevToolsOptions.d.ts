/**
 * Options for opening developer tools.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebContentsDevToolsOptions {
  /** The mode to open DevTools in. */
  mode: 'bottom' | 'detach' | 'right' | 'undocked';
}
