/**
 * Web preferences for configuring Electron web content behavior.
 *
 * @public
 * @unofficial
 */
export interface WebPreferences {
  /** Whether to enable the Chromium DevTools. */
  contextIsolation?: boolean;

  /** Whether to enable the Chromium DevTools. */
  devTools?: boolean;

  /** Whether to enable Node.js integration in the renderer process. */
  nodeIntegration?: boolean;

  /** Path to the preload script. */
  preload?: string;
}
