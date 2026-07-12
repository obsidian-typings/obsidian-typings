import type { ElectronBrowserWindowLoadURLOptions } from './ElectronBrowserWindowLoadURLOptions.d.ts';
import type { ElectronKeyboardInputEvent } from './ElectronKeyboardInputEvent.d.ts';
import type { ElectronMouseInputEvent } from './ElectronMouseInputEvent.d.ts';
import type { ElectronMouseWheelInputEvent } from './ElectronMouseWheelInputEvent.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronPrintToPDFOptions } from './ElectronPrintToPDFOptions.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronWebviewTagFindInPageOptions } from './ElectronWebviewTagFindInPageOptions.d.ts';
import type { ElectronWebviewTagPrintOptions } from './ElectronWebviewTagPrintOptions.d.ts';

/**
 * Electron WebviewTag for embedding external web content in the application.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebviewTag extends HTMLElement {
  /** Whether to allow popups. */
  allowpopups: boolean;

  /** The Blink features to disable. */
  disableblinkfeatures: string;

  /** Whether to disable web security. */
  disablewebsecurity: boolean;

  /** The Blink features to enable. */
  enableblinkfeatures: string;

  /** The HTTP referrer URL. */
  httpreferrer: string;

  /** Whether to enable Node.js integration. */
  nodeintegration: boolean;

  /** Whether to enable Node.js integration in sub-frames. */
  nodeintegrationinsubframes: boolean;

  /** The session partition string. */
  partition: string;

  /** Whether to enable plugins. */
  plugins: boolean;

  /** The path to the preload script. */
  preload: string;

  /** The URL to load. */
  src: string;

  /** The user agent string. */
  useragent: string;

  /** The web preferences string. */
  webpreferences: string;

  /**
   * Registers an event listener.
   *
   * @param type - The event type.
   * @param listener - The event handler.
   * @param options - Listener options.
   */
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): void;

  /**
   * Returns whether the webview can navigate back.
   *
   * @returns Whether the webview can go back.
   */
  canGoBack(): boolean;

  /**
   * Returns whether the webview can navigate forward.
   *
   * @returns Whether the webview can go forward.
   */
  canGoForward(): boolean;

  /**
   * Returns whether the webview can navigate to the given offset.
   *
   * @param offset - The history offset.
   * @returns Whether the webview can go to the offset.
   */
  canGoToOffset(offset: number): boolean;

  /**
   * Captures a snapshot of the page.
   *
   * @param rect - The area to capture. Omitting it captures the whole visible page.
   * @returns The captured image.
   */
  capturePage(rect?: ElectronRectangle): Promise<ElectronNativeImage>;

  /** Clears the navigation history. */
  clearHistory(): void;

  /** Closes the developer tools. */
  closeDevTools(): void;

  /** Copies the selected text to the clipboard. */
  copy(): void;

  /** Cuts the selected text to the clipboard. */
  cut(): void;

  /** Deletes the selected text. */
  delete(): void;

  /**
   * Initiates a download of the resource at the given URL without navigating.
   *
   * @param url - The URL to download.
   */
  downloadURL(url: string): void;

  /**
   * Evaluates JavaScript code in the context of the page.
   *
   * @param code - The JavaScript code to execute.
   * @param userGesture - Whether the execution should be treated as a user gesture.
   * @returns The result of the evaluated code.
   */
  executeJavaScript(code: string, userGesture?: boolean): Promise<unknown>;

  /**
   * Starts finding text in the page.
   *
   * @param text - The text to find.
   * @param options - Find options including `forward`, `findNext`, and `matchCase`.
   * @returns The request id.
   */
  findInPage(text: string, options?: ElectronWebviewTagFindInPageOptions): number;

  /**
   * Returns the title of the page.
   *
   * @returns The page title.
   */
  getTitle(): string;

  /**
   * Returns the URL of the current page.
   *
   * @returns The current URL.
   */
  getURL(): string;

  /**
   * Returns the user agent string.
   *
   * @returns The user agent.
   */
  getUserAgent(): string;

  /**
   * Returns the web contents id.
   *
   * @returns The web contents id.
   */
  getWebContentsId(): number;

  /**
   * Returns the current zoom factor.
   *
   * @returns The zoom factor.
   */
  getZoomFactor(): number;

  /**
   * Returns the current zoom level.
   *
   * @returns The zoom level.
   */
  getZoomLevel(): number;

  /** Navigates back. */
  goBack(): void;

  /** Navigates forward. */
  goForward(): void;

  /**
   * Navigates to the specified history index.
   *
   * @param index - The history index.
   */
  goToIndex(index: number): void;

  /**
   * Navigates to the specified history offset.
   *
   * @param offset - The history offset.
   */
  goToOffset(offset: number): void;

  /**
   * Injects CSS into the page.
   *
   * @param css - The CSS string to inject.
   * @returns A key that can be used to remove the CSS.
   */
  insertCSS(css: string): Promise<string>;

  /**
   * Inserts text at the current cursor position.
   *
   * @param text - The text to insert.
   */
  insertText(text: string): Promise<void>;

  /**
   * Inspects the element at the given position.
   *
   * @param x - The x coordinate.
   * @param y - The y coordinate.
   */
  inspectElement(x: number, y: number): void;

  /** Opens the developer tools for the service worker context present in the guest page. */
  inspectServiceWorker(): void;

  /** Opens the developer tools for the shared worker context present in the guest page. */
  inspectSharedWorker(): void;

  /**
   * Returns whether the page audio is muted.
   *
   * @returns Whether audio is muted.
   */
  isAudioMuted(): boolean;

  /**
   * Returns whether the page renderer process has crashed.
   *
   * @returns Whether the page has crashed.
   */
  isCrashed(): boolean;

  /**
   * Returns whether the page is currently producing audio.
   *
   * @returns Whether the page is audible.
   */
  isCurrentlyAudible(): boolean;

  /**
   * Returns whether the developer tools are focused.
   *
   * @returns Whether DevTools are focused.
   */
  isDevToolsFocused(): boolean;

  /**
   * Returns whether the developer tools are opened.
   *
   * @returns Whether DevTools are opened.
   */
  isDevToolsOpened(): boolean;

  /**
   * Returns whether the page is loading resources.
   *
   * @returns Whether the page is loading.
   */
  isLoading(): boolean;

  /**
   * Returns whether the main frame of the page is loading.
   *
   * @returns Whether the main frame is loading.
   */
  isLoadingMainFrame(): boolean;

  /**
   * Returns whether the page is waiting for a first response.
   *
   * @returns Whether the page is waiting for a response.
   */
  isWaitingForResponse(): boolean;

  /**
   * Loads the given URL.
   *
   * @param url - The URL to load. Must contain the protocol prefix, e.g. `http://` or `file://`.
   * @param options - Options for loading the URL including `httpReferrer`, `userAgent`, and `extraHeaders`.
   */
  loadURL(url: string, options?: ElectronBrowserWindowLoadURLOptions): Promise<void>;

  /** Opens the developer tools. */
  openDevTools(): void;

  /** Pastes from the clipboard. */
  paste(): void;

  /** Pastes and matches the style of the current text. */
  pasteAndMatchStyle(): void;

  /**
   * Prints the page.
   *
   * @param options - Print options including `silent`, `printBackground`, and `deviceName`.
   */
  print(options?: ElectronWebviewTagPrintOptions): Promise<void>;

  /**
   * Prints the page as a PDF.
   *
   * @param options - The PDF print options.
   * @returns The generated PDF data.
   */
  printToPDF(options: ElectronPrintToPDFOptions): Promise<Uint8Array>;

  /** Redoes the last undone action. */
  redo(): void;

  /** Reloads the page. */
  reload(): void;

  /** Reloads the page ignoring the cache. */
  reloadIgnoringCache(): void;

  /**
   * Removes an event listener.
   *
   * @param type - The event type.
   * @param listener - The event handler.
   * @param options - Listener options.
   */
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;

  /**
   * Removes previously injected CSS.
   *
   * @param key - The key of the CSS to remove.
   */
  removeInsertedCSS(key: string): Promise<void>;

  /**
   * Replaces the current text with the given text.
   *
   * @param text - The replacement text.
   */
  replace(text: string): void;

  /**
   * Replaces the misspelled word with the given text.
   *
   * @param text - The replacement text.
   */
  replaceMisspelling(text: string): void;

  /** Selects all text on the page. */
  selectAll(): void;

  /**
   * Sends an asynchronous message to the renderer process.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  send(channel: string, ...args: unknown[]): Promise<void>;

  /**
   * Sends an input event to the page.
   *
   * @param inputEvent - The keyboard, mouse, or mouse wheel event to inject.
   */
  sendInputEvent(inputEvent: ElectronKeyboardInputEvent | ElectronMouseInputEvent | ElectronMouseWheelInputEvent): Promise<void>;

  /**
   * Sends a message to a specific frame in the renderer process.
   *
   * @param frameId - The frame identifier tuple.
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  sendToFrame(frameId: [number, number], channel: string, ...args: unknown[]): Promise<void>;

  /**
   * Sets whether the page audio is muted.
   *
   * @param muted - Whether to mute audio.
   */
  setAudioMuted(muted: boolean): void;

  /**
   * Sets the user agent string.
   *
   * @param userAgent - The user agent to set.
   */
  setUserAgent(userAgent: string): void;

  /**
   * Sets the maximum and minimum pinch-to-zoom level.
   *
   * @param minimumLevel - The minimum zoom level.
   * @param maximumLevel - The maximum zoom level.
   */
  setVisualZoomLevelLimits(minimumLevel: number, maximumLevel: number): Promise<void>;

  /**
   * Sets the zoom factor of the page.
   *
   * @param factor - The zoom factor.
   */
  setZoomFactor(factor: number): void;

  /**
   * Sets the zoom level of the page.
   *
   * @param level - The zoom level.
   */
  setZoomLevel(level: number): void;

  /**
   * Shows a pop-up dictionary that searches the selected word on the page.
   *
   * @remarks Only available on macOS (`darwin`).
   */
  showDefinitionForSelection(): void;

  /** Stops loading the page. */
  stop(): void;

  /**
   * Stops the find in page request.
   *
   * @param action - The action to take when stopping.
   */
  stopFindInPage(action: 'activateSelection' | 'clearSelection' | 'keepSelection'): void;

  /** Undoes the last action. */
  undo(): void;

  /** Clears the current selection. */
  unselect(): void;
}
