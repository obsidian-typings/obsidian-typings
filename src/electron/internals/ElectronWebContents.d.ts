import type { Session } from './Session.d.ts';

/**
 * Electron WebContents for rendering and controlling a web page.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebContents {
  /** The unique identifier for this web contents. */
  id: number;

  /** The session associated with this web contents. */
  session: Session;

  /** Closes the developer tools. */
  closeDevTools(): void;

  /**
   * Evaluates JavaScript code in the context of the page.
   *
   * @param code - The JavaScript code to execute.
   * @param userGesture - Whether the execution should be treated as a user gesture.
   * @returns The result of the evaluated code.
   */
  executeJavaScript(code: string, userGesture?: boolean): Promise<unknown>;

  /**
   * Returns the title of the web page.
   *
   * @returns The page title.
   */
  getTitle(): string;

  /**
   * Returns the URL of the current web page.
   *
   * @returns The current URL.
   */
  getURL(): string;

  /**
   * Returns whether the web contents have been destroyed.
   *
   * @returns Whether the web contents are destroyed.
   */
  isDestroyed(): boolean;

  /**
   * Returns whether the web contents are focused.
   *
   * @returns Whether the web contents are focused.
   */
  isFocused(): boolean;

  /**
   * Returns whether the web contents are still loading resources.
   *
   * @returns Whether the page is loading.
   */
  isLoading(): boolean;

  /* eslint-disable jsdoc/check-param-names -- TSDoc does not support dot-notation sub-params. */
  /**
   * Opens the developer tools.
   *
   * @param options - Options for the developer tools including `mode`.
   */
  openDevTools(options?: { mode: 'bottom' | 'detach' | 'right' | 'undocked' }): void;
  /* eslint-enable jsdoc/check-param-names -- Re-enable after inline object param. */

  /**
   * Sends an asynchronous message to the renderer process.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  send(channel: string, ...args: unknown[]): void;
}
