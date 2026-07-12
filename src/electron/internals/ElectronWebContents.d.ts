import type { BrowserWindowConstructorOptions } from './BrowserWindowConstructorOptions.d.ts';
import type { ElectronAuthenticationResponseDetails } from './ElectronAuthenticationResponseDetails.d.ts';
import type { ElectronAuthInfo } from './ElectronAuthInfo.d.ts';
import type { ElectronBluetoothDevice } from './ElectronBluetoothDevice.d.ts';
import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronBrowserWindowLoadFileOptions } from './ElectronBrowserWindowLoadFileOptions.d.ts';
import type { ElectronBrowserWindowLoadURLOptions } from './ElectronBrowserWindowLoadURLOptions.d.ts';
import type { ElectronCertificate } from './ElectronCertificate.d.ts';
import type { ElectronContextMenuParams } from './ElectronContextMenuParams.d.ts';
import type { ElectronDebugger } from './ElectronDebugger.d.ts';
import type { ElectronDidCreateWindowDetails } from './ElectronDidCreateWindowDetails.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronFindInPageOptions } from './ElectronFindInPageOptions.d.ts';
import type { ElectronFrameCreatedDetails } from './ElectronFrameCreatedDetails.d.ts';
import type { ElectronHandlerDetails } from './ElectronHandlerDetails.d.ts';
import type { ElectronInput } from './ElectronInput.d.ts';
import type { ElectronInsertCSSOptions } from './ElectronInsertCSSOptions.d.ts';
import type { ElectronItem } from './ElectronItem.d.ts';
import type { ElectronKeyboardInputEvent } from './ElectronKeyboardInputEvent.d.ts';
import type { ElectronMessagePortMain } from './ElectronMessagePortMain.d.ts';
import type { ElectronMouseInputEvent } from './ElectronMouseInputEvent.d.ts';
import type { ElectronMouseWheelInputEvent } from './ElectronMouseWheelInputEvent.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronNewWindowWebContentsEvent } from './ElectronNewWindowWebContentsEvent.d.ts';
import type { ElectronParameters } from './ElectronParameters.d.ts';
import type { ElectronPoint } from './ElectronPoint.d.ts';
import type { ElectronPostBody } from './ElectronPostBody.d.ts';
import type { ElectronPrinterInfo } from './ElectronPrinterInfo.d.ts';
import type { ElectronPrintToPDFOptions } from './ElectronPrintToPDFOptions.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronReferrer } from './ElectronReferrer.d.ts';
import type { ElectronRenderProcessGoneDetails } from './ElectronRenderProcessGoneDetails.d.ts';
import type { ElectronResult } from './ElectronResult.d.ts';
import type { ElectronSharedWorkerInfo } from './ElectronSharedWorkerInfo.d.ts';
import type { ElectronSize } from './ElectronSize.d.ts';
import type { ElectronWebContentsDevToolsOptions } from './ElectronWebContentsDevToolsOptions.d.ts';
import type { ElectronWebContentsPrintOptions } from './ElectronWebContentsPrintOptions.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';
import type { ElectronWebSource } from './ElectronWebSource.d.ts';
import type { ElectronWindowOpenHandlerResponse } from './ElectronWindowOpenHandlerResponse.d.ts';
import type { Session } from './Session.d.ts';
import type { WebPreferences } from './WebPreferences.d.ts';

/**
 * Electron WebContents for rendering and controlling a web page.
 *
 * Note: the upstream static factories (`fromId`, `fromDevToolsTargetId`, `getAllWebContents`,
 * `getFocusedWebContents`) cannot be expressed on a plain interface and are therefore omitted here.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebContents {
  /** Whether this page is muted. */
  audioMuted: boolean;

  /** Whether this web contents throttles animations and timers when the page becomes backgrounded. */
  backgroundThrottling: boolean;

  /** The debugger instance for this web contents. */
  readonly debugger: ElectronDebugger;

  /** The DevTools web contents associated with this web contents, or `null` when DevTools is closed. */
  readonly devToolsWebContents: ElectronWebContents | null;

  /** The frame rate of the web contents. Only applicable when offscreen rendering is enabled. */
  frameRate: number;

  /** The web contents that might own this web contents. */
  readonly hostWebContents: ElectronWebContents;

  /** The unique id of this web contents. */
  readonly id: number;

  /** The top frame of the page's frame hierarchy. */
  readonly mainFrame: ElectronWebFrameMain;

  /** The session used by this web contents. */
  readonly session: Session;

  /** The user agent for this web page. */
  userAgent: string;

  /** The zoom factor for this web contents. The zoom factor is the zoom percent divided by 100. */
  zoomFactor: number;

  /** The zoom level for this web contents. */
  zoomLevel: number;

  /**
   * Registers a listener for the `before-input-event` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `before-input-event` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'before-input-event', listener: (event: ElectronEvent, input: ElectronInput) => void): this;

  /**
   * Registers a listener for the `blur` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `blur` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'blur', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `certificate-error` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `certificate-error` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'certificate-error', listener: (event: ElectronEvent, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Registers a listener for the `console-message` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `console-message` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'console-message', listener: (event: ElectronEvent, level: number, message: string, line: number, sourceId: string) => void): this;

  /**
   * Registers a listener for the `context-menu` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `context-menu` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'context-menu', listener: (event: ElectronEvent, params: ElectronContextMenuParams) => void): this;

  /**
   * Registers a listener for the `crashed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `crashed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Registers a listener for the `cursor-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `cursor-changed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'cursor-changed', listener: (event: ElectronEvent, type: string, image: ElectronNativeImage, scale: number, size: ElectronSize, hotspot: ElectronPoint) => void): this;

  /**
   * Registers a listener for the `destroyed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `destroyed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'destroyed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-closed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-closed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'devtools-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-focused` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-focused` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'devtools-focused', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-opened` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-opened` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'devtools-opened', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-reload-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-reload-page` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'devtools-reload-page', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `did-attach-webview` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-attach-webview` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-attach-webview', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Registers a listener for the `did-change-theme-color` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-change-theme-color` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-change-theme-color', listener: (event: ElectronEvent, color: null | string) => void): this;

  /**
   * Registers a listener for the `did-create-window` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-create-window` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-create-window', listener: (window: ElectronBrowserWindow, details: ElectronDidCreateWindowDetails) => void): this;

  /**
   * Registers a listener for the `did-fail-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-fail-load` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-fail-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-fail-provisional-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-fail-provisional-load` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-fail-provisional-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-finish-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-finish-load` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-finish-load', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `did-frame-finish-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-frame-finish-load` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-frame-finish-load', listener: (event: ElectronEvent, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-frame-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-frame-navigate` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-frame-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-navigate` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string) => void): this;

  /**
   * Registers a listener for the `did-navigate-in-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-navigate-in-page` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-navigate-in-page', listener: (event: ElectronEvent, url: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-redirect-navigation` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-redirect-navigation` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-redirect-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-start-loading` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-start-loading` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-start-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `did-start-navigation` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-start-navigation` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-start-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-stop-loading` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-stop-loading` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'did-stop-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `dom-ready` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `dom-ready` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'dom-ready', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `enter-html-full-screen` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `enter-html-full-screen` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `focus` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `focus` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'focus', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `found-in-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `found-in-page` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'found-in-page', listener: (event: ElectronEvent, result: ElectronResult) => void): this;

  /**
   * Registers a listener for the `frame-created` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `frame-created` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'frame-created', listener: (event: ElectronEvent, details: ElectronFrameCreatedDetails) => void): this;

  /**
   * Registers a listener for the `ipc-message` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `ipc-message` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'ipc-message', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `ipc-message-sync` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `ipc-message-sync` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'ipc-message-sync', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `leave-html-full-screen` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `leave-html-full-screen` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `login` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `login` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'login', listener: (event: ElectronEvent, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Registers a listener for the `media-paused` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `media-paused` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'media-paused', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `media-started-playing` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `media-started-playing` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'media-started-playing', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `new-window` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `new-window` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'new-window', listener: (event: ElectronNewWindowWebContentsEvent, url: string, frameName: string, disposition: 'background-tab' | 'default' | 'foreground-tab' | 'new-window' | 'other' | 'save-to-disk', options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: ElectronReferrer, postBody: ElectronPostBody) => void): this;

  /**
   * Registers a listener for the `page-favicon-updated` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `page-favicon-updated` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'page-favicon-updated', listener: (event: ElectronEvent, favicons: string[]) => void): this;

  /**
   * Registers a listener for the `page-title-updated` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `page-title-updated` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;

  /**
   * Registers a listener for the `paint` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `paint` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'paint', listener: (event: ElectronEvent, dirtyRect: ElectronRectangle, image: ElectronNativeImage) => void): this;

  /**
   * Registers a listener for the `plugin-crashed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `plugin-crashed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'plugin-crashed', listener: (event: ElectronEvent, name: string, version: string) => void): this;

  /**
   * Registers a listener for the `preferred-size-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `preferred-size-changed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'preferred-size-changed', listener: (event: ElectronEvent, preferredSize: ElectronSize) => void): this;

  /**
   * Registers a listener for the `preload-error` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `preload-error` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'preload-error', listener: (event: ElectronEvent, preloadPath: string, error: Error) => void): this;

  /**
   * Registers a listener for the `render-process-gone` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `render-process-gone` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'render-process-gone', listener: (event: ElectronEvent, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Registers a listener for the `responsive` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `responsive` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'responsive', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `select-bluetooth-device` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `select-bluetooth-device` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'select-bluetooth-device', listener: (event: ElectronEvent, devices: ElectronBluetoothDevice[], callback: (deviceId: string) => void) => void): this;

  /**
   * Registers a listener for the `select-client-certificate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `select-client-certificate` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'select-client-certificate', listener: (event: ElectronEvent, url: string, certificateList: ElectronCertificate[], callback: (certificate: ElectronCertificate) => void) => void): this;

  /**
   * Registers a listener for the `unresponsive` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `unresponsive` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'unresponsive', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `update-target-url` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `update-target-url` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'update-target-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a listener for the `will-attach-webview` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-attach-webview` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'will-attach-webview', listener: (event: ElectronEvent, webPreferences: WebPreferences, params: Record<string, string>) => void): this;

  /**
   * Registers a listener for the `will-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-navigate` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'will-navigate', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a listener for the `will-prevent-unload` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-prevent-unload` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'will-prevent-unload', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `will-redirect` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-redirect` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'will-redirect', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `zoom-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `zoom-changed` event is emitted.
   * @returns This web contents instance.
   */
  addListener(event: 'zoom-changed', listener: (event: ElectronEvent, zoomDirection: 'in' | 'out') => void): this;

  /**
   * Adds the specified path to the DevTools workspace.
   *
   * @param path - The path to add.
   */
  addWorkSpace(path: string): void;

  /**
   * Begins subscribing for presentation events and captured frames.
   *
   * @param onlyDirty - Whether the captured image should contain only the repainted area.
   * @param callback - Called with the captured frame image and the repainted rect.
   */
  beginFrameSubscription(onlyDirty: boolean, callback: (image: ElectronNativeImage, dirtyRect: ElectronRectangle) => void): void;

  /**
   * Begins subscribing for presentation events and captured frames.
   *
   * @param callback - Called with the captured frame image and the repainted rect.
   */
  beginFrameSubscription(callback: (image: ElectronNativeImage, dirtyRect: ElectronRectangle) => void): void;

  /**
   * Returns whether the browser can go back to the previous web page.
   *
   * @returns Whether the browser can go back.
   */
  canGoBack(): boolean;

  /**
   * Returns whether the browser can go forward to the next web page.
   *
   * @returns Whether the browser can go forward.
   */
  canGoForward(): boolean;

  /**
   * Returns whether the web page can go to the given offset.
   *
   * @param offset - The offset from the current entry.
   * @returns Whether the web page can go to the offset.
   */
  canGoToOffset(offset: number): boolean;

  /**
   * Captures a snapshot of the page within `rect`. Omitting `rect` captures the whole visible page.
   *
   * @param rect - The area of the page to capture.
   * @returns A promise resolving with a native image.
   */
  capturePage(rect?: ElectronRectangle): Promise<ElectronNativeImage>;

  /** Clears the navigation history. */
  clearHistory(): void;

  /** Closes the developer tools. */
  closeDevTools(): void;

  /** Executes the editing command `copy` in the web page. */
  copy(): void;

  /**
   * Copies the image at the given position to the clipboard.
   *
   * @param x - The x coordinate.
   * @param y - The y coordinate.
   */
  copyImageAt(x: number, y: number): void;

  /** Executes the editing command `cut` in the web page. */
  cut(): void;

  /**
   * Decreases the capturer count by one.
   *
   * @param stayHidden - Whether to decrease the hidden capturer count instead.
   * @param stayAwake - Whether the page should stay awake.
   */
  decrementCapturerCount(stayHidden?: boolean, stayAwake?: boolean): void;

  /** Executes the editing command `delete` in the web page. */
  delete(): void;

  /** Disables device emulation enabled by `enableDeviceEmulation`. */
  disableDeviceEmulation(): void;

  /**
   * Initiates a download of the resource at `url` without navigating.
   *
   * @param url - The URL of the resource to download.
   */
  downloadURL(url: string): void;

  /**
   * Enables device emulation with the given parameters.
   *
   * @param parameters - The device emulation parameters.
   */
  enableDeviceEmulation(parameters: ElectronParameters): void;

  /** Ends subscribing for frame presentation events. */
  endFrameSubscription(): void;

  /**
   * Evaluates `code` in the page.
   *
   * @param code - The JavaScript code to execute.
   * @param userGesture - Whether the execution should be treated as a user gesture.
   * @returns A promise resolving with the result of the executed code.
   */
  executeJavaScript(code: string, userGesture?: boolean): Promise<unknown>;

  /**
   * Works like `executeJavaScript` but evaluates `scripts` in an isolated context.
   *
   * @param worldId - The id of the isolated world.
   * @param scripts - The scripts to evaluate.
   * @param userGesture - Whether the execution should be treated as a user gesture.
   * @returns A promise resolving with the result of the executed code.
   */
  executeJavaScriptInIsolatedWorld(worldId: number, scripts: ElectronWebSource[], userGesture?: boolean): Promise<unknown>;

  /**
   * Starts a request to find all matches for `text` in the web page.
   *
   * @param text - The text to search for.
   * @param options - Options for the find request.
   * @returns The request id used for the request.
   */
  findInPage(text: string, options?: ElectronFindInPageOptions): number;

  /** Focuses the web page. */
  focus(): void;

  /** Forcefully terminates the renderer process currently hosting this web contents. */
  forcefullyCrashRenderer(): void;

  /**
   * Returns information about all shared workers.
   *
   * @returns Information about all shared workers.
   */
  getAllSharedWorkers(): ElectronSharedWorkerInfo[];

  /**
   * Returns whether this web contents throttles animations and timers when backgrounded.
   *
   * @returns Whether background throttling is enabled.
   */
  getBackgroundThrottling(): boolean;

  /**
   * Returns the current frame rate when offscreen rendering is enabled.
   *
   * @returns The current frame rate.
   */
  getFrameRate(): number;

  /**
   * Returns the identifier of a web contents stream.
   *
   * @param requestWebContents - The web contents that would access the stream.
   * @returns The identifier of the web contents stream.
   */
  getMediaSourceId(requestWebContents: ElectronWebContents): string;

  /**
   * Returns the operating system `pid` of the associated renderer process.
   *
   * @returns The operating system process id.
   */
  getOSProcessId(): number;

  /**
   * Returns the system printer list.
   *
   * @returns The system printer list.
   */
  getPrinters(): ElectronPrinterInfo[];

  /**
   * Returns the system printer list.
   *
   * @returns A promise resolving with the system printer list.
   */
  getPrintersAsync(): Promise<ElectronPrinterInfo[]>;

  /**
   * Returns the Chromium internal `pid` of the associated renderer.
   *
   * @returns The Chromium internal process id.
   */
  getProcessId(): number;

  /**
   * Returns the title of the current web page.
   *
   * @returns The page title.
   */
  getTitle(): string;

  /**
   * Returns the type of the web contents.
   *
   * @returns The type of the web contents.
   */
  getType(): 'backgroundPage' | 'browserView' | 'offscreen' | 'remote' | 'webview' | 'window';

  /**
   * Returns the URL of the current web page.
   *
   * @returns The current URL.
   */
  getURL(): string;

  /**
   * Returns the user agent for this web page.
   *
   * @returns The user agent string.
   */
  getUserAgent(): string;

  /**
   * Returns the WebRTC IP handling policy.
   *
   * @returns The WebRTC IP handling policy.
   */
  getWebRTCIPHandlingPolicy(): string;

  /**
   * Returns the current zoom factor.
   *
   * @returns The current zoom factor.
   */
  getZoomFactor(): number;

  /**
   * Returns the current zoom level.
   *
   * @returns The current zoom level.
   */
  getZoomLevel(): number;

  /** Makes the browser go back a web page. */
  goBack(): void;

  /** Makes the browser go forward a web page. */
  goForward(): void;

  /**
   * Navigates the browser to the specified absolute web page index.
   *
   * @param index - The absolute web page index.
   */
  goToIndex(index: number): void;

  /**
   * Navigates to the specified offset from the current entry.
   *
   * @param offset - The offset from the current entry.
   */
  goToOffset(offset: number): void;

  /**
   * Increases the capturer count by one.
   *
   * @param size - The preferred size for the captured page.
   * @param stayHidden - Whether the page should stay hidden.
   * @param stayAwake - Whether the page should stay awake.
   */
  incrementCapturerCount(size?: ElectronSize, stayHidden?: boolean, stayAwake?: boolean): void;

  /**
   * Injects CSS into the current web page and returns a unique key for the inserted stylesheet.
   *
   * @param css - The CSS to inject.
   * @param options - Options for inserting the CSS.
   * @returns A promise resolving with the key for the inserted CSS.
   */
  insertCSS(css: string, options?: ElectronInsertCSSOptions): Promise<string>;

  /**
   * Inserts `text` into the focused element.
   *
   * @param text - The text to insert.
   * @returns A promise that resolves when the text is inserted.
   */
  insertText(text: string): Promise<void>;

  /**
   * Starts inspecting the element at the given position.
   *
   * @param x - The x coordinate.
   * @param y - The y coordinate.
   */
  inspectElement(x: number, y: number): void;

  /** Opens the developer tools for the service worker context. */
  inspectServiceWorker(): void;

  /** Opens the developer tools for the shared worker context. */
  inspectSharedWorker(): void;

  /**
   * Inspects the shared worker based on its id.
   *
   * @param workerId - The id of the shared worker.
   */
  inspectSharedWorkerById(workerId: string): void;

  /** Schedules a full repaint of the window this web contents is in. */
  invalidate(): void;

  /**
   * Returns whether this page has been muted.
   *
   * @returns Whether the page is muted.
   */
  isAudioMuted(): boolean;

  /**
   * Returns whether this page is being captured.
   *
   * @returns Whether the page is being captured.
   */
  isBeingCaptured(): boolean;

  /**
   * Returns whether the renderer process has crashed.
   *
   * @returns Whether the renderer process has crashed.
   */
  isCrashed(): boolean;

  /**
   * Returns whether audio is currently playing.
   *
   * @returns Whether audio is currently playing.
   */
  isCurrentlyAudible(): boolean;

  /**
   * Returns whether the web page is destroyed.
   *
   * @returns Whether the web page is destroyed.
   */
  isDestroyed(): boolean;

  /**
   * Returns whether the DevTools view is focused.
   *
   * @returns Whether the DevTools view is focused.
   */
  isDevToolsFocused(): boolean;

  /**
   * Returns whether the DevTools is opened.
   *
   * @returns Whether the DevTools is opened.
   */
  isDevToolsOpened(): boolean;

  /**
   * Returns whether the web page is focused.
   *
   * @returns Whether the web page is focused.
   */
  isFocused(): boolean;

  /**
   * Returns whether the web page is still loading resources.
   *
   * @returns Whether the page is loading.
   */
  isLoading(): boolean;

  /**
   * Returns whether the main frame is still loading.
   *
   * @returns Whether the main frame is loading.
   */
  isLoadingMainFrame(): boolean;

  /**
   * Returns whether offscreen rendering is enabled.
   *
   * @returns Whether offscreen rendering is enabled.
   */
  isOffscreen(): boolean;

  /**
   * Returns whether it is currently painting when offscreen rendering is enabled.
   *
   * @returns Whether it is currently painting.
   */
  isPainting(): boolean;

  /**
   * Returns whether the web page is waiting for a first response from the main resource.
   *
   * @returns Whether the page is waiting for a response.
   */
  isWaitingForResponse(): boolean;

  /**
   * Loads the given file in the window.
   *
   * @param filePath - The path to the HTML file relative to the root of the application.
   * @param options - Options for loading the file.
   * @returns A promise that resolves when the page has finished loading.
   */
  loadFile(filePath: string, options?: ElectronBrowserWindowLoadFileOptions): Promise<void>;

  /**
   * Loads the `url` in the window.
   *
   * @param url - The URL to load. Must contain the protocol prefix.
   * @param options - Options for loading the URL.
   * @returns A promise that resolves when the page has finished loading.
   */
  loadURL(url: string, options?: ElectronBrowserWindowLoadURLOptions): Promise<void>;

  /**
   * Registers a listener for the `before-input-event` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `before-input-event` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'before-input-event', listener: (event: ElectronEvent, input: ElectronInput) => void): this;

  /**
   * Registers a listener for the `blur` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `blur` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'blur', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `certificate-error` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `certificate-error` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'certificate-error', listener: (event: ElectronEvent, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Registers a listener for the `console-message` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `console-message` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'console-message', listener: (event: ElectronEvent, level: number, message: string, line: number, sourceId: string) => void): this;

  /**
   * Registers a listener for the `context-menu` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `context-menu` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'context-menu', listener: (event: ElectronEvent, params: ElectronContextMenuParams) => void): this;

  /**
   * Registers a listener for the `crashed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `crashed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Registers a listener for the `cursor-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `cursor-changed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'cursor-changed', listener: (event: ElectronEvent, type: string, image: ElectronNativeImage, scale: number, size: ElectronSize, hotspot: ElectronPoint) => void): this;

  /**
   * Registers a listener for the `destroyed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `destroyed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'destroyed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-closed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-closed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'devtools-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-focused` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-focused` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'devtools-focused', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-opened` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-opened` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'devtools-opened', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `devtools-reload-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-reload-page` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'devtools-reload-page', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `did-attach-webview` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-attach-webview` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-attach-webview', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Registers a listener for the `did-change-theme-color` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-change-theme-color` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-change-theme-color', listener: (event: ElectronEvent, color: null | string) => void): this;

  /**
   * Registers a listener for the `did-create-window` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-create-window` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-create-window', listener: (window: ElectronBrowserWindow, details: ElectronDidCreateWindowDetails) => void): this;

  /**
   * Registers a listener for the `did-fail-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-fail-load` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-fail-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-fail-provisional-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-fail-provisional-load` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-fail-provisional-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-finish-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-finish-load` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-finish-load', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `did-frame-finish-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-frame-finish-load` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-frame-finish-load', listener: (event: ElectronEvent, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-frame-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-frame-navigate` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-frame-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-navigate` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string) => void): this;

  /**
   * Registers a listener for the `did-navigate-in-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-navigate-in-page` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-navigate-in-page', listener: (event: ElectronEvent, url: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-redirect-navigation` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-redirect-navigation` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-redirect-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-start-loading` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-start-loading` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-start-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `did-start-navigation` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-start-navigation` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-start-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `did-stop-loading` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-stop-loading` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'did-stop-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `dom-ready` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `dom-ready` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'dom-ready', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `enter-html-full-screen` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `enter-html-full-screen` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `focus` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `focus` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'focus', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `found-in-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `found-in-page` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'found-in-page', listener: (event: ElectronEvent, result: ElectronResult) => void): this;

  /**
   * Registers a listener for the `frame-created` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `frame-created` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'frame-created', listener: (event: ElectronEvent, details: ElectronFrameCreatedDetails) => void): this;

  /**
   * Registers a listener for the `ipc-message` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `ipc-message` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'ipc-message', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `ipc-message-sync` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `ipc-message-sync` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'ipc-message-sync', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `leave-html-full-screen` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `leave-html-full-screen` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `login` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `login` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'login', listener: (event: ElectronEvent, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Registers a listener for the `media-paused` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `media-paused` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'media-paused', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `media-started-playing` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `media-started-playing` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'media-started-playing', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `new-window` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `new-window` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'new-window', listener: (event: ElectronNewWindowWebContentsEvent, url: string, frameName: string, disposition: 'background-tab' | 'default' | 'foreground-tab' | 'new-window' | 'other' | 'save-to-disk', options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: ElectronReferrer, postBody: ElectronPostBody) => void): this;

  /**
   * Registers a listener for the `page-favicon-updated` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `page-favicon-updated` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'page-favicon-updated', listener: (event: ElectronEvent, favicons: string[]) => void): this;

  /**
   * Registers a listener for the `page-title-updated` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `page-title-updated` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;

  /**
   * Registers a listener for the `paint` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `paint` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'paint', listener: (event: ElectronEvent, dirtyRect: ElectronRectangle, image: ElectronNativeImage) => void): this;

  /**
   * Registers a listener for the `plugin-crashed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `plugin-crashed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'plugin-crashed', listener: (event: ElectronEvent, name: string, version: string) => void): this;

  /**
   * Registers a listener for the `preferred-size-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `preferred-size-changed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'preferred-size-changed', listener: (event: ElectronEvent, preferredSize: ElectronSize) => void): this;

  /**
   * Registers a listener for the `preload-error` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `preload-error` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'preload-error', listener: (event: ElectronEvent, preloadPath: string, error: Error) => void): this;

  /**
   * Registers a listener for the `render-process-gone` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `render-process-gone` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'render-process-gone', listener: (event: ElectronEvent, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Registers a listener for the `responsive` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `responsive` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'responsive', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `select-bluetooth-device` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `select-bluetooth-device` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'select-bluetooth-device', listener: (event: ElectronEvent, devices: ElectronBluetoothDevice[], callback: (deviceId: string) => void) => void): this;

  /**
   * Registers a listener for the `select-client-certificate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `select-client-certificate` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'select-client-certificate', listener: (event: ElectronEvent, url: string, certificateList: ElectronCertificate[], callback: (certificate: ElectronCertificate) => void) => void): this;

  /**
   * Registers a listener for the `unresponsive` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `unresponsive` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'unresponsive', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `update-target-url` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `update-target-url` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'update-target-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a listener for the `will-attach-webview` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-attach-webview` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'will-attach-webview', listener: (event: ElectronEvent, webPreferences: WebPreferences, params: Record<string, string>) => void): this;

  /**
   * Registers a listener for the `will-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-navigate` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'will-navigate', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a listener for the `will-prevent-unload` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-prevent-unload` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'will-prevent-unload', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `will-redirect` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-redirect` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'will-redirect', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a listener for the `zoom-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `zoom-changed` event is emitted.
   * @returns This web contents instance.
   */
  on(event: 'zoom-changed', listener: (event: ElectronEvent, zoomDirection: 'in' | 'out') => void): this;

  /**
   * Registers a one-time listener for the `before-input-event` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `before-input-event` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'before-input-event', listener: (event: ElectronEvent, input: ElectronInput) => void): this;

  /**
   * Registers a one-time listener for the `blur` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `blur` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'blur', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `certificate-error` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `certificate-error` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'certificate-error', listener: (event: ElectronEvent, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Registers a one-time listener for the `console-message` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `console-message` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'console-message', listener: (event: ElectronEvent, level: number, message: string, line: number, sourceId: string) => void): this;

  /**
   * Registers a one-time listener for the `context-menu` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `context-menu` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'context-menu', listener: (event: ElectronEvent, params: ElectronContextMenuParams) => void): this;

  /**
   * Registers a one-time listener for the `crashed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `crashed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Registers a one-time listener for the `cursor-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `cursor-changed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'cursor-changed', listener: (event: ElectronEvent, type: string, image: ElectronNativeImage, scale: number, size: ElectronSize, hotspot: ElectronPoint) => void): this;

  /**
   * Registers a one-time listener for the `destroyed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `destroyed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'destroyed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `devtools-closed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-closed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'devtools-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `devtools-focused` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-focused` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'devtools-focused', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `devtools-opened` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-opened` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'devtools-opened', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `devtools-reload-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `devtools-reload-page` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'devtools-reload-page', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `did-attach-webview` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-attach-webview` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-attach-webview', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Registers a one-time listener for the `did-change-theme-color` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-change-theme-color` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-change-theme-color', listener: (event: ElectronEvent, color: null | string) => void): this;

  /**
   * Registers a one-time listener for the `did-create-window` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-create-window` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-create-window', listener: (window: ElectronBrowserWindow, details: ElectronDidCreateWindowDetails) => void): this;

  /**
   * Registers a one-time listener for the `did-fail-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-fail-load` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-fail-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-fail-provisional-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-fail-provisional-load` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-fail-provisional-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-finish-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-finish-load` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-finish-load', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `did-frame-finish-load` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-frame-finish-load` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-frame-finish-load', listener: (event: ElectronEvent, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-frame-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-frame-navigate` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-frame-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-navigate` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string) => void): this;

  /**
   * Registers a one-time listener for the `did-navigate-in-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-navigate-in-page` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-navigate-in-page', listener: (event: ElectronEvent, url: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-redirect-navigation` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-redirect-navigation` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-redirect-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-start-loading` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-start-loading` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-start-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `did-start-navigation` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-start-navigation` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-start-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `did-stop-loading` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `did-stop-loading` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'did-stop-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `dom-ready` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `dom-ready` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'dom-ready', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `enter-html-full-screen` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `enter-html-full-screen` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `focus` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `focus` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'focus', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `found-in-page` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `found-in-page` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'found-in-page', listener: (event: ElectronEvent, result: ElectronResult) => void): this;

  /**
   * Registers a one-time listener for the `frame-created` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `frame-created` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'frame-created', listener: (event: ElectronEvent, details: ElectronFrameCreatedDetails) => void): this;

  /**
   * Registers a one-time listener for the `ipc-message` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `ipc-message` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'ipc-message', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `ipc-message-sync` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `ipc-message-sync` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'ipc-message-sync', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `leave-html-full-screen` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `leave-html-full-screen` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `login` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `login` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'login', listener: (event: ElectronEvent, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Registers a one-time listener for the `media-paused` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `media-paused` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'media-paused', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `media-started-playing` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `media-started-playing` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'media-started-playing', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `new-window` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `new-window` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'new-window', listener: (event: ElectronNewWindowWebContentsEvent, url: string, frameName: string, disposition: 'background-tab' | 'default' | 'foreground-tab' | 'new-window' | 'other' | 'save-to-disk', options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: ElectronReferrer, postBody: ElectronPostBody) => void): this;

  /**
   * Registers a one-time listener for the `page-favicon-updated` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `page-favicon-updated` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'page-favicon-updated', listener: (event: ElectronEvent, favicons: string[]) => void): this;

  /**
   * Registers a one-time listener for the `page-title-updated` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `page-title-updated` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;

  /**
   * Registers a one-time listener for the `paint` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `paint` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'paint', listener: (event: ElectronEvent, dirtyRect: ElectronRectangle, image: ElectronNativeImage) => void): this;

  /**
   * Registers a one-time listener for the `plugin-crashed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `plugin-crashed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'plugin-crashed', listener: (event: ElectronEvent, name: string, version: string) => void): this;

  /**
   * Registers a one-time listener for the `preferred-size-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `preferred-size-changed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'preferred-size-changed', listener: (event: ElectronEvent, preferredSize: ElectronSize) => void): this;

  /**
   * Registers a one-time listener for the `preload-error` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `preload-error` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'preload-error', listener: (event: ElectronEvent, preloadPath: string, error: Error) => void): this;

  /**
   * Registers a one-time listener for the `render-process-gone` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `render-process-gone` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'render-process-gone', listener: (event: ElectronEvent, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Registers a one-time listener for the `responsive` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `responsive` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'responsive', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `select-bluetooth-device` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `select-bluetooth-device` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'select-bluetooth-device', listener: (event: ElectronEvent, devices: ElectronBluetoothDevice[], callback: (deviceId: string) => void) => void): this;

  /**
   * Registers a one-time listener for the `select-client-certificate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `select-client-certificate` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'select-client-certificate', listener: (event: ElectronEvent, url: string, certificateList: ElectronCertificate[], callback: (certificate: ElectronCertificate) => void) => void): this;

  /**
   * Registers a one-time listener for the `unresponsive` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `unresponsive` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'unresponsive', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `update-target-url` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `update-target-url` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'update-target-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a one-time listener for the `will-attach-webview` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-attach-webview` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'will-attach-webview', listener: (event: ElectronEvent, webPreferences: WebPreferences, params: Record<string, string>) => void): this;

  /**
   * Registers a one-time listener for the `will-navigate` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-navigate` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'will-navigate', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a one-time listener for the `will-prevent-unload` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-prevent-unload` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'will-prevent-unload', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `will-redirect` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `will-redirect` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'will-redirect', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Registers a one-time listener for the `zoom-changed` event.
   *
   * @param event - The event name.
   * @param listener - Called when the `zoom-changed` event is emitted.
   * @returns This web contents instance.
   */
  once(event: 'zoom-changed', listener: (event: ElectronEvent, zoomDirection: 'in' | 'out') => void): this;

  /**
   * Opens the developer tools.
   *
   * @param options - Options for the developer tools including `mode`.
   */
  openDevTools(options?: ElectronWebContentsDevToolsOptions): void;

  /** Executes the editing command `paste` in the web page. */
  paste(): void;

  /** Executes the editing command `pasteAndMatchStyle` in the web page. */
  pasteAndMatchStyle(): void;

  /**
   * Sends a message to the renderer process, optionally transferring ownership of message ports.
   *
   * @param channel - The channel name.
   * @param message - The message to send.
   * @param transfer - Message ports whose ownership is transferred with the message.
   */
  postMessage(channel: string, message: unknown, transfer?: ElectronMessagePortMain[]): void;

  /**
   * Prints the window's web page.
   *
   * @param options - Options for printing.
   * @param callback - Called with whether printing succeeded and any failure reason.
   */
  print(options?: ElectronWebContentsPrintOptions, callback?: (success: boolean, failureReason: string) => void): void;

  /**
   * Prints the window's web page as PDF.
   *
   * @param options - Options for printing to PDF.
   * @returns A promise resolving with the generated PDF data.
   */
  printToPDF(options: ElectronPrintToPDFOptions): Promise<Buffer>;

  /** Executes the editing command `redo` in the web page. */
  redo(): void;

  /** Reloads the current web page. */
  reload(): void;

  /** Reloads the current page and ignores the cache. */
  reloadIgnoringCache(): void;

  /**
   * Removes the inserted CSS from the current web page identified by its key.
   *
   * @param key - The key returned from `insertCSS`.
   * @returns A promise that resolves if the removal was successful.
   */
  removeInsertedCSS(key: string): Promise<void>;

  /**
   * Removes a previously registered `before-input-event` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'before-input-event', listener: (event: ElectronEvent, input: ElectronInput) => void): this;

  /**
   * Removes a previously registered `blur` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'blur', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `certificate-error` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'certificate-error', listener: (event: ElectronEvent, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Removes a previously registered `console-message` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'console-message', listener: (event: ElectronEvent, level: number, message: string, line: number, sourceId: string) => void): this;

  /**
   * Removes a previously registered `context-menu` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'context-menu', listener: (event: ElectronEvent, params: ElectronContextMenuParams) => void): this;

  /**
   * Removes a previously registered `crashed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Removes a previously registered `cursor-changed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'cursor-changed', listener: (event: ElectronEvent, type: string, image: ElectronNativeImage, scale: number, size: ElectronSize, hotspot: ElectronPoint) => void): this;

  /**
   * Removes a previously registered `destroyed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'destroyed', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `devtools-closed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'devtools-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `devtools-focused` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'devtools-focused', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `devtools-opened` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'devtools-opened', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `devtools-reload-page` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'devtools-reload-page', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `did-attach-webview` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-attach-webview', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Removes a previously registered `did-change-theme-color` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-change-theme-color', listener: (event: ElectronEvent, color: null | string) => void): this;

  /**
   * Removes a previously registered `did-create-window` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-create-window', listener: (window: ElectronBrowserWindow, details: ElectronDidCreateWindowDetails) => void): this;

  /**
   * Removes a previously registered `did-fail-load` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-fail-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-fail-provisional-load` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-fail-provisional-load', listener: (event: ElectronEvent, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-finish-load` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-finish-load', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `did-frame-finish-load` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-frame-finish-load', listener: (event: ElectronEvent, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-frame-navigate` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-frame-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-navigate` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-navigate', listener: (event: ElectronEvent, url: string, httpResponseCode: number, httpStatusText: string) => void): this;

  /**
   * Removes a previously registered `did-navigate-in-page` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-navigate-in-page', listener: (event: ElectronEvent, url: string, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-redirect-navigation` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-redirect-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-start-loading` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-start-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `did-start-navigation` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-start-navigation', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `did-stop-loading` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'did-stop-loading', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `dom-ready` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'dom-ready', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes a previously registered `enter-html-full-screen` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'enter-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `focus` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'focus', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `found-in-page` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'found-in-page', listener: (event: ElectronEvent, result: ElectronResult) => void): this;

  /**
   * Removes a previously registered `frame-created` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'frame-created', listener: (event: ElectronEvent, details: ElectronFrameCreatedDetails) => void): this;

  /**
   * Removes a previously registered `ipc-message` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'ipc-message', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `ipc-message-sync` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'ipc-message-sync', listener: (event: ElectronEvent, channel: string, ...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `leave-html-full-screen` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'leave-html-full-screen', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `login` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'login', listener: (event: ElectronEvent, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Removes a previously registered `media-paused` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'media-paused', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `media-started-playing` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'media-started-playing', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `new-window` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'new-window', listener: (event: ElectronNewWindowWebContentsEvent, url: string, frameName: string, disposition: 'background-tab' | 'default' | 'foreground-tab' | 'new-window' | 'other' | 'save-to-disk', options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: ElectronReferrer, postBody: ElectronPostBody) => void): this;

  /**
   * Removes a previously registered `page-favicon-updated` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'page-favicon-updated', listener: (event: ElectronEvent, favicons: string[]) => void): this;

  /**
   * Removes a previously registered `page-title-updated` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'page-title-updated', listener: (event: ElectronEvent, title: string, explicitSet: boolean) => void): this;

  /**
   * Removes a previously registered `paint` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'paint', listener: (event: ElectronEvent, dirtyRect: ElectronRectangle, image: ElectronNativeImage) => void): this;

  /**
   * Removes a previously registered `plugin-crashed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'plugin-crashed', listener: (event: ElectronEvent, name: string, version: string) => void): this;

  /**
   * Removes a previously registered `preferred-size-changed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'preferred-size-changed', listener: (event: ElectronEvent, preferredSize: ElectronSize) => void): this;

  /**
   * Removes a previously registered `preload-error` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'preload-error', listener: (event: ElectronEvent, preloadPath: string, error: Error) => void): this;

  /**
   * Removes a previously registered `render-process-gone` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'render-process-gone', listener: (event: ElectronEvent, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Removes a previously registered `responsive` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'responsive', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `select-bluetooth-device` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'select-bluetooth-device', listener: (event: ElectronEvent, devices: ElectronBluetoothDevice[], callback: (deviceId: string) => void) => void): this;

  /**
   * Removes a previously registered `select-client-certificate` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'select-client-certificate', listener: (event: ElectronEvent, url: string, certificateList: ElectronCertificate[], callback: (certificate: ElectronCertificate) => void) => void): this;

  /**
   * Removes a previously registered `unresponsive` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'unresponsive', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously registered `update-target-url` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'update-target-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Removes a previously registered `will-attach-webview` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'will-attach-webview', listener: (event: ElectronEvent, webPreferences: WebPreferences, params: Record<string, string>) => void): this;

  /**
   * Removes a previously registered `will-navigate` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'will-navigate', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Removes a previously registered `will-prevent-unload` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'will-prevent-unload', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes a previously registered `will-redirect` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'will-redirect', listener: (event: ElectronEvent, url: string, isInPlace: boolean, isMainFrame: boolean, frameProcessId: number, frameRoutingId: number) => void): this;

  /**
   * Removes a previously registered `zoom-changed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This web contents instance.
   */
  removeListener(event: 'zoom-changed', listener: (event: ElectronEvent, zoomDirection: 'in' | 'out') => void): this;

  /**
   * Removes the specified path from the DevTools workspace.
   *
   * @param path - The path to remove.
   */
  removeWorkSpace(path: string): void;

  /**
   * Executes the editing command `replace` in the web page.
   *
   * @param text - The replacement text.
   */
  replace(text: string): void;

  /**
   * Executes the editing command `replaceMisspelling` in the web page.
   *
   * @param text - The replacement text.
   */
  replaceMisspelling(text: string): void;

  /**
   * Saves the current web page to the given path.
   *
   * @param fullPath - The absolute path to save the page to.
   * @param saveType - The save type.
   * @returns A promise that resolves if the page is saved.
   */
  savePage(fullPath: string, saveType: 'HTMLComplete' | 'HTMLOnly' | 'MHTML'): Promise<void>;

  /** Executes the editing command `selectAll` in the web page. */
  selectAll(): void;

  /**
   * Sends an asynchronous message to the renderer process via `channel`, along with arguments.
   *
   * @param channel - The channel name.
   * @param args - Arguments to serialize and send.
   */
  send(channel: string, ...args: unknown[]): void;

  /**
   * Injects a trusted input event into the page, driving the same input pipeline a real user produces
   * (unlike untrusted `dispatchEvent`, which CodeMirror and the CSS `:hover` engine ignore).
   *
   * @param inputEvent - The keyboard, mouse, or mouse wheel event to inject.
   */
  sendInputEvent(inputEvent: ElectronKeyboardInputEvent | ElectronMouseInputEvent | ElectronMouseWheelInputEvent): void;

  /**
   * Sends an asynchronous message to a specific frame in a renderer process via `channel`.
   *
   * @param frameId - The frame id, or a `[processId, frameId]` pair.
   * @param channel - The channel name.
   * @param args - Arguments to serialize and send.
   */
  sendToFrame(frameId: [number, number] | number, channel: string, ...args: unknown[]): void;

  /**
   * Mutes or unmutes the audio on the current web page.
   *
   * @param muted - Whether the audio should be muted.
   */
  setAudioMuted(muted: boolean): void;

  /**
   * Controls whether this web contents throttles animations and timers when backgrounded.
   *
   * @param allowed - Whether background throttling is allowed.
   */
  setBackgroundThrottling(allowed: boolean): void;

  /**
   * Uses the given web contents as the target to show DevTools.
   *
   * @param devToolsWebContents - The web contents to show DevTools in.
   */
  setDevToolsWebContents(devToolsWebContents: ElectronWebContents): void;

  /**
   * Sets the frame rate when offscreen rendering is enabled. Only values between 1 and 240 are accepted.
   *
   * @param fps - The frame rate in frames per second.
   */
  setFrameRate(fps: number): void;

  /**
   * Ignores application menu shortcuts while this web contents is focused.
   *
   * @param ignore - Whether to ignore menu shortcuts.
   */
  setIgnoreMenuShortcuts(ignore: boolean): void;

  /**
   * Sets the image animation policy for this web contents.
   *
   * @param policy - The image animation policy.
   */
  setImageAnimationPolicy(policy: 'animate' | 'animateOnce' | 'noAnimation'): void;

  /**
   * Overrides the user agent for this web page.
   *
   * @param userAgent - The user agent to set.
   */
  setUserAgent(userAgent: string): void;

  /**
   * Sets the maximum and minimum pinch-to-zoom level.
   *
   * @param minimumLevel - The minimum zoom level.
   * @param maximumLevel - The maximum zoom level.
   * @returns A promise that resolves when the limits are set.
   */
  setVisualZoomLevelLimits(minimumLevel: number, maximumLevel: number): Promise<void>;

  /**
   * Sets the WebRTC IP handling policy.
   *
   * @param policy - The WebRTC IP handling policy.
   */
  setWebRTCIPHandlingPolicy(policy: 'default_public_and_private_interfaces' | 'default_public_interface_only' | 'default' | 'disable_non_proxied_udp'): void;

  /**
   * Sets a handler called before a new window is requested by the renderer.
   *
   * @param handler - The handler that decides whether to allow or deny the new window.
   */
  setWindowOpenHandler(handler: (details: ElectronHandlerDetails) => ElectronWindowOpenHandlerResponse): void;

  /**
   * Changes the zoom factor to the specified factor.
   *
   * @param factor - The zoom factor. Must be greater than `0.0`.
   */
  setZoomFactor(factor: number): void;

  /**
   * Changes the zoom level to the specified level.
   *
   * @param level - The zoom level.
   */
  setZoomLevel(level: number): void;

  /**
   * Shows a pop-up dictionary that searches the selected word on the page. Only available on macOS.
   */
  showDefinitionForSelection(): void;

  /**
   * Sets the `item` as the dragging item for the current drag-drop operation.
   *
   * @param item - The item to drag.
   */
  startDrag(item: ElectronItem): void;

  /** Starts painting when offscreen rendering is enabled and not painting. */
  startPainting(): void;

  /** Stops any pending navigation. */
  stop(): void;

  /**
   * Stops any `findInPage` request for the web contents with the provided action.
   *
   * @param action - The action to take when stopping the find request.
   */
  stopFindInPage(action: 'activateSelection' | 'clearSelection' | 'keepSelection'): void;

  /** Stops painting when offscreen rendering is enabled and painting. */
  stopPainting(): void;

  /**
   * Takes a V8 heap snapshot and saves it to `filePath`.
   *
   * @param filePath - The path to save the heap snapshot to.
   * @returns A promise resolving when the snapshot has been created.
   */
  takeHeapSnapshot(filePath: string): Promise<void>;

  /** Toggles the developer tools. */
  toggleDevTools(): void;

  /** Executes the editing command `undo` in the web page. */
  undo(): void;

  /** Executes the editing command `unselect` in the web page. */
  unselect(): void;
}
