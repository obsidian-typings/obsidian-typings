import type { ElectronAboutPanelOptionsOptions } from './ElectronAboutPanelOptionsOptions.d.ts';
import type { ElectronApplicationInfoForProtocolReturnValue } from './ElectronApplicationInfoForProtocolReturnValue.d.ts';
import type { ElectronAuthenticationResponseDetails } from './ElectronAuthenticationResponseDetails.d.ts';
import type { ElectronAuthInfo } from './ElectronAuthInfo.d.ts';
import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronCertificate } from './ElectronCertificate.d.ts';
import type { ElectronCommandLine } from './ElectronCommandLine.d.ts';
import type { ElectronConfigureHostResolverOptions } from './ElectronConfigureHostResolverOptions.d.ts';
import type { ElectronContinueActivityDetails } from './ElectronContinueActivityDetails.d.ts';
import type { ElectronDetails } from './ElectronDetails.d.ts';
import type { ElectronDock } from './ElectronDock.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronFileIconOptions } from './ElectronFileIconOptions.d.ts';
import type { ElectronFocusOptions } from './ElectronFocusOptions.d.ts';
import type { ElectronGPUFeatureStatus } from './ElectronGPUFeatureStatus.d.ts';
import type { ElectronImportCertificateOptions } from './ElectronImportCertificateOptions.d.ts';
import type { ElectronJumpListCategory } from './ElectronJumpListCategory.d.ts';
import type { ElectronJumpListSettings } from './ElectronJumpListSettings.d.ts';
import type { ElectronLoginItemSettings } from './ElectronLoginItemSettings.d.ts';
import type { ElectronLoginItemSettingsOptions } from './ElectronLoginItemSettingsOptions.d.ts';
import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronMoveToApplicationsFolderOptions } from './ElectronMoveToApplicationsFolderOptions.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronNotificationResponse } from './ElectronNotificationResponse.d.ts';
import type { ElectronProcessMetric } from './ElectronProcessMetric.d.ts';
import type { ElectronRelaunchOptions } from './ElectronRelaunchOptions.d.ts';
import type { ElectronRenderProcessGoneDetails } from './ElectronRenderProcessGoneDetails.d.ts';
import type { ElectronSettings } from './ElectronSettings.d.ts';
import type { ElectronTask } from './ElectronTask.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { Session } from './Session.d.ts';

/**
 * Electron App for controlling the application lifecycle.
 *
 * @public
 * @unofficial
 */
export interface ElectronApp {
  /**
   * Whether Chrome's accessibility support is enabled. Setting this to `true` manually enables
   * accessibility support. Must be set after the `ready` event is emitted. macOS and Windows only.
   */
  accessibilitySupportEnabled: boolean;

  /** The application menu, or `null` if none has been set. */
  applicationMenu: ElectronMenu | null;

  /** The badge count for the current app. Setting the count to `0` hides the badge. Linux and macOS only. */
  badgeCount: number;

  /** Reads and manipulates the command line arguments that Chromium uses. */
  readonly commandLine: ElectronCommandLine;

  /** Performs actions on the app icon in the user's dock. macOS only. */
  readonly dock: ElectronDock;

  /** Whether the app is packaged. Can be used to distinguish development and production environments. */
  readonly isPackaged: boolean;

  /** The current application's name, from the application's `package.json` file. */
  name: string;

  /** Whether the app is currently running under an ARM64 translator (Rosetta or Windows WOW). macOS and Windows only. */
  readonly runningUnderARM64Translation: boolean;

  /**
   * Whether the app is currently running under the Rosetta Translator Environment. macOS only.
   *
   * @deprecated Deprecated by Electron.
   */
  readonly runningUnderRosettaTranslation: boolean;

  /** The user agent string Electron uses as a global fallback. */
  userAgentFallback: string;

  /**
   * Adds a listener for the `accessibility-support-changed` event.
   *
   * Emitted when Chrome's accessibility support changes. macOS and Windows only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'accessibility-support-changed', listener: (event: ElectronEvent, accessibilitySupportEnabled: boolean) => void): this;

  /**
   * Adds a listener for the `activate` event.
   *
   * Emitted when the application is activated. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'activate', listener: (event: ElectronEvent, hasVisibleWindows: boolean) => void): this;

  /**
   * Adds a listener for the `activity-was-continued` event.
   *
   * Emitted during Handoff after an activity from this device was successfully resumed on another one. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'activity-was-continued', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Adds a listener for the `before-quit` event.
   *
   * Emitted before the application starts closing its windows.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'before-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Adds a listener for the `browser-window-blur` event.
   *
   * Emitted when a browserWindow gets blurred.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'browser-window-blur', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Adds a listener for the `browser-window-created` event.
   *
   * Emitted when a new browserWindow is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'browser-window-created', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Adds a listener for the `browser-window-focus` event.
   *
   * Emitted when a browserWindow gets focused.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'browser-window-focus', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Adds a listener for the `certificate-error` event.
   *
   * Emitted when failed to verify the certificate for a URL.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'certificate-error', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Adds a listener for the `child-process-gone` event.
   *
   * Emitted when the child process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'child-process-gone', listener: (event: ElectronEvent, details: ElectronDetails) => void): this;

  /**
   * Adds a listener for the `continue-activity` event.
   *
   * Emitted during Handoff when an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'continue-activity', listener: (event: ElectronEvent, type: string, userInfo: unknown, details: ElectronContinueActivityDetails) => void): this;

  /**
   * Adds a listener for the `continue-activity-error` event.
   *
   * Emitted during Handoff when an activity from a different device fails to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'continue-activity-error', listener: (event: ElectronEvent, type: string, error: string) => void): this;

  /**
   * Adds a listener for the `did-become-active` event.
   *
   * Emitted every time the app becomes active. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'did-become-active', listener: (event: ElectronEvent) => void): this;

  /**
   * Adds a listener for the `first-instance-ack` event.
   *
   * Emitted in the second instance during `requestSingleInstanceLock` when the first instance calls the `ackCallback`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'first-instance-ack', listener: (event: ElectronEvent, additionalData: unknown) => void): this;

  /**
   * Adds a listener for the `gpu-info-update` event.
   *
   * Emitted whenever there is a GPU info update.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'gpu-info-update', listener: (...args: unknown[]) => void): this;

  /**
   * Adds a listener for the `gpu-process-crashed` event.
   *
   * Emitted when the GPU process crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  addListener(event: 'gpu-process-crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Adds a listener for the `login` event.
   *
   * Emitted when `webContents` wants to do basic auth.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'login', listener: (event: ElectronEvent, webContents: ElectronWebContents, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Adds a listener for the `new-window-for-tab` event.
   *
   * Emitted when the user clicks the native macOS new tab button. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'new-window-for-tab', listener: (event: ElectronEvent) => void): this;

  /**
   * Adds a listener for the `open-file` event.
   *
   * Emitted when the user wants to open a file with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'open-file', listener: (event: ElectronEvent, path: string) => void): this;

  /**
   * Adds a listener for the `open-url` event.
   *
   * Emitted when the user wants to open a URL with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'open-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Adds a listener for the `quit` event.
   *
   * Emitted when the application is quitting.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'quit', listener: (event: ElectronEvent, exitCode: number) => void): this;

  /**
   * Adds a listener for the `ready` event.
   *
   * Emitted once, when Electron has finished initializing.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'ready', listener: (event: ElectronEvent, launchInfo: ElectronNotificationResponse | Record<string, unknown>) => void): this;

  /**
   * Adds a listener for the `render-process-gone` event.
   *
   * Emitted when the renderer process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'render-process-gone', listener: (event: ElectronEvent, webContents: ElectronWebContents, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Adds a listener for the `renderer-process-crashed` event.
   *
   * Emitted when the renderer process of `webContents` crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  addListener(event: 'renderer-process-crashed', listener: (event: ElectronEvent, webContents: ElectronWebContents, killed: boolean) => void): this;

  /**
   * Adds a listener for the `second-instance` event.
   *
   * Emitted inside the primary instance when a second instance is executed and calls `requestSingleInstanceLock`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'second-instance', listener: (event: ElectronEvent, argv: string[], workingDirectory: string, additionalData: unknown, ackCallback: unknown) => void): this;

  /**
   * Adds a listener for the `select-client-certificate` event.
   *
   * Emitted when a client certificate is requested.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'select-client-certificate', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, certificateList: ElectronCertificate[], callback: (certificate?: ElectronCertificate) => void) => void): this;

  /**
   * Adds a listener for the `session-created` event.
   *
   * Emitted when Electron has created a new `session`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'session-created', listener: (session: Session) => void): this;

  /**
   * Adds a listener for the `update-activity-state` event.
   *
   * Emitted when Handoff is about to be resumed on another device. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'update-activity-state', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Adds a listener for the `web-contents-created` event.
   *
   * Emitted when a new `webContents` is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'web-contents-created', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Adds a listener for the `will-continue-activity` event.
   *
   * Emitted during Handoff before an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'will-continue-activity', listener: (event: ElectronEvent, type: string) => void): this;

  /**
   * Adds a listener for the `will-finish-launching` event.
   *
   * Emitted when the application has finished basic startup.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'will-finish-launching', listener: (...args: unknown[]) => void): this;

  /**
   * Adds a listener for the `will-quit` event.
   *
   * Emitted when all windows have been closed and the application will quit.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'will-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Adds a listener for the `window-all-closed` event.
   *
   * Emitted when all windows have been closed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  addListener(event: 'window-all-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Adds `path` to the recent documents list. macOS and Windows only.
   *
   * @param path - The path to add.
   */
  addRecentDocument(path: string): void;

  /** Clears the recent documents list. macOS and Windows only. */
  clearRecentDocuments(): void;

  /**
   * Configures host resolution (DNS and DNS-over-HTTPS). Must be called after the `ready` event.
   *
   * @param options - The host resolver options.
   */
  configureHostResolver(options: ElectronConfigureHostResolverOptions): void;

  /**
   * Disables the per-domain blocking of 3D APIs after repeated GPU process crashes. Can only be
   * called before the app is ready.
   */
  disableDomainBlockingFor3DAPIs(): void;

  /** Disables hardware acceleration for the current app. Can only be called before the app is ready. */
  disableHardwareAcceleration(): void;

  /** Enables full sandbox mode on the app. Can only be called before the app is ready. */
  enableSandbox(): void;

  /**
   * Exits immediately with `exitCode`. All windows are closed immediately without asking the user,
   * and the `before-quit` and `will-quit` events are not emitted.
   *
   * @param exitCode - The exit code.
   * @default `0`
   */
  exit(exitCode?: number): void;

  /**
   * Focuses the app. On Linux, focuses the first visible window; on macOS, makes the app active; on
   * Windows, focuses the app's first window.
   *
   * @param options - The focus options.
   */
  focus(options?: ElectronFocusOptions): void;

  /**
   * Returns the application name, icon and path of the default handler for the protocol of a URL.
   * macOS and Windows only.
   *
   * @param url - The URL whose protocol handler to look up.
   * @returns A promise resolved with the handler information.
   */
  getApplicationInfoForProtocol(url: string): Promise<ElectronApplicationInfoForProtocolReturnValue>;

  /**
   * Returns the application name of the default handler for the protocol of a URL.
   *
   * @param url - The URL whose protocol handler to look up.
   * @returns The handler application name, or an empty string if there is no handler.
   */
  getApplicationNameForProtocol(url: string): string;

  /**
   * Returns memory and CPU usage statistics of all the processes associated with the app.
   *
   * @returns The array of process metrics.
   */
  getAppMetrics(): ElectronProcessMetric[];

  /**
   * Returns the current application directory.
   *
   * @returns The application directory.
   */
  getAppPath(): string;

  /**
   * Returns the current value displayed in the counter badge. Linux and macOS only.
   *
   * @returns The badge count.
   */
  getBadgeCount(): number;

  /**
   * Returns the type of the currently running activity. macOS only.
   *
   * @returns The current activity type.
   */
  getCurrentActivityType(): string;

  /**
   * Fetches a path's associated icon.
   *
   * @param path - The path whose icon to fetch.
   * @param options - Options controlling the icon size.
   * @returns A promise resolved with the icon.
   */
  getFileIcon(path: string, options?: ElectronFileIconOptions): Promise<ElectronNativeImage>;

  /**
   * Returns the Graphics Feature Status from `chrome://gpu/`. Only usable after the
   * `gpu-info-update` event is emitted.
   *
   * @returns The GPU feature status.
   */
  getGPUFeatureStatus(): ElectronGPUFeatureStatus;

  /**
   * Returns GPU information as in Chromium's GPUInfo object.
   *
   * @param infoType - The level of detail to return.
   * @returns A promise resolved with the GPU information.
   */
  getGPUInfo(infoType: 'basic' | 'complete'): Promise<unknown>;

  /**
   * Returns the current settings of the Jump List. Windows only.
   *
   * @returns The Jump List settings.
   */
  getJumpListSettings(): ElectronJumpListSettings;

  /**
   * Returns the current application locale, fetched using Chromium's `l10n_util` library.
   *
   * @returns The locale string.
   */
  getLocale(): string;

  /**
   * Returns the operating system's locale two-letter ISO 3166 country code.
   *
   * @returns The country code, or an empty string when it cannot be detected.
   */
  getLocaleCountryCode(): string;

  /**
   * Returns the app's login item settings. macOS and Windows only.
   *
   * @param options - Options used to compare against the current login item settings.
   * @returns The login item settings.
   */
  getLoginItemSettings(options?: ElectronLoginItemSettingsOptions): ElectronLoginItemSettings;

  /**
   * Returns the current application's name, from the application's `package.json` file.
   *
   * @returns The application name.
   */
  getName(): string;

  /**
   * Returns a path to a special directory or file associated with `name`.
   *
   * @param name - The name of the special path to retrieve.
   * @returns The full path.
   */
  getPath(name: 'appData' | 'cache' | 'crashDumps' | 'desktop' | 'documents' | 'downloads' | 'exe' | 'home' | 'logs' | 'module' | 'music' | 'pictures' | 'recent' | 'temp' | 'userData' | 'videos'): string;

  /**
   * Returns the user's preferred system languages, most preferred first, as BCP 47 language tags.
   *
   * @returns The preferred system languages.
   */
  getPreferredSystemLanguages(): string[];

  /**
   * Returns the system's current locale as a BCP 47 language tag.
   *
   * @returns The system locale.
   */
  getSystemLocale(): string;

  /**
   * Returns the version of the loaded application.
   *
   * @returns The version string.
   */
  getVersion(): string;

  /**
   * Returns whether this instance of the app is currently holding the single instance lock.
   *
   * @returns Whether this instance holds the single instance lock.
   */
  hasSingleInstanceLock(): boolean;

  /** Hides all application windows without minimizing them. macOS only. */
  hide(): void;

  /**
   * Imports the certificate in pkcs12 format into the platform certificate store. Linux only.
   *
   * @param options - The certificate import options.
   * @param callback - Called with the result of the import operation (`0` indicates success).
   */
  importCertificate(options: ElectronImportCertificateOptions, callback: (result: number) => void): void;

  /** Invalidates the current Handoff user activity. macOS only. */
  invalidateCurrentActivity(): void;

  /**
   * Returns whether Chrome's accessibility support is enabled. macOS and Windows only.
   *
   * @returns Whether accessibility support is enabled.
   */
  isAccessibilitySupportEnabled(): boolean;

  /**
   * Returns whether the current executable is the default handler for a protocol.
   *
   * @param protocol - The protocol name, without the `://`.
   * @param path - The executable path to compare against.
   * @param args - The arguments to compare against.
   * @returns Whether the current executable is the default handler.
   */
  isDefaultProtocolClient(protocol: string, path?: string, args?: string[]): boolean;

  /**
   * Returns whether the current OS version allows for native emoji pickers.
   *
   * @returns Whether native emoji pickers are supported.
   */
  isEmojiPanelSupported(): boolean;

  /**
   * Returns whether the application is currently hidden. macOS only.
   *
   * @returns Whether the app is hidden.
   */
  isHidden(): boolean;

  /**
   * Returns whether the application is currently running from the system's Application folder. macOS only.
   *
   * @returns Whether the app is in the Applications folder.
   */
  isInApplicationsFolder(): boolean;

  /**
   * Returns whether Electron has finished initializing.
   *
   * @returns Whether the app is ready.
   */
  isReady(): boolean;

  /**
   * Returns whether Secure Keyboard Entry is enabled. macOS only.
   *
   * @returns Whether Secure Keyboard Entry is enabled.
   */
  isSecureKeyboardEntryEnabled(): boolean;

  /**
   * Returns whether the current desktop environment is the Unity launcher. Linux only.
   *
   * @returns Whether Unity is running.
   */
  isUnityRunning(): boolean;

  /**
   * Moves the current app to the Applications folder. If successful, the app quits and relaunches. macOS only.
   *
   * @param options - Options including a conflict handler.
   * @returns Whether the move was successful.
   */
  moveToApplicationsFolder(options?: ElectronMoveToApplicationsFolderOptions): boolean;

  /**
   * Registers a listener for the `accessibility-support-changed` event.
   *
   * Emitted when Chrome's accessibility support changes. macOS and Windows only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'accessibility-support-changed', listener: (event: ElectronEvent, accessibilitySupportEnabled: boolean) => void): this;

  /**
   * Registers a listener for the `activate` event.
   *
   * Emitted when the application is activated. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'activate', listener: (event: ElectronEvent, hasVisibleWindows: boolean) => void): this;

  /**
   * Registers a listener for the `activity-was-continued` event.
   *
   * Emitted during Handoff after an activity from this device was successfully resumed on another one. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'activity-was-continued', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Registers a listener for the `before-quit` event.
   *
   * Emitted before the application starts closing its windows.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'before-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `browser-window-blur` event.
   *
   * Emitted when a browserWindow gets blurred.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'browser-window-blur', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Registers a listener for the `browser-window-created` event.
   *
   * Emitted when a new browserWindow is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'browser-window-created', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Registers a listener for the `browser-window-focus` event.
   *
   * Emitted when a browserWindow gets focused.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'browser-window-focus', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Registers a listener for the `certificate-error` event.
   *
   * Emitted when failed to verify the certificate for a URL.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'certificate-error', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Registers a listener for the `child-process-gone` event.
   *
   * Emitted when the child process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'child-process-gone', listener: (event: ElectronEvent, details: ElectronDetails) => void): this;

  /**
   * Registers a listener for the `continue-activity` event.
   *
   * Emitted during Handoff when an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'continue-activity', listener: (event: ElectronEvent, type: string, userInfo: unknown, details: ElectronContinueActivityDetails) => void): this;

  /**
   * Registers a listener for the `continue-activity-error` event.
   *
   * Emitted during Handoff when an activity from a different device fails to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'continue-activity-error', listener: (event: ElectronEvent, type: string, error: string) => void): this;

  /**
   * Registers a listener for the `did-become-active` event.
   *
   * Emitted every time the app becomes active. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'did-become-active', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `first-instance-ack` event.
   *
   * Emitted in the second instance during `requestSingleInstanceLock` when the first instance calls the `ackCallback`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'first-instance-ack', listener: (event: ElectronEvent, additionalData: unknown) => void): this;

  /**
   * Registers a listener for the `gpu-info-update` event.
   *
   * Emitted whenever there is a GPU info update.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'gpu-info-update', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `gpu-process-crashed` event.
   *
   * Emitted when the GPU process crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  on(event: 'gpu-process-crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Registers a listener for the `login` event.
   *
   * Emitted when `webContents` wants to do basic auth.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'login', listener: (event: ElectronEvent, webContents: ElectronWebContents, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Registers a listener for the `new-window-for-tab` event.
   *
   * Emitted when the user clicks the native macOS new tab button. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'new-window-for-tab', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `open-file` event.
   *
   * Emitted when the user wants to open a file with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'open-file', listener: (event: ElectronEvent, path: string) => void): this;

  /**
   * Registers a listener for the `open-url` event.
   *
   * Emitted when the user wants to open a URL with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'open-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a listener for the `quit` event.
   *
   * Emitted when the application is quitting.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'quit', listener: (event: ElectronEvent, exitCode: number) => void): this;

  /**
   * Registers a listener for the `ready` event.
   *
   * Emitted once, when Electron has finished initializing.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'ready', listener: (event: ElectronEvent, launchInfo: ElectronNotificationResponse | Record<string, unknown>) => void): this;

  /**
   * Registers a listener for the `render-process-gone` event.
   *
   * Emitted when the renderer process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'render-process-gone', listener: (event: ElectronEvent, webContents: ElectronWebContents, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Registers a listener for the `renderer-process-crashed` event.
   *
   * Emitted when the renderer process of `webContents` crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  on(event: 'renderer-process-crashed', listener: (event: ElectronEvent, webContents: ElectronWebContents, killed: boolean) => void): this;

  /**
   * Registers a listener for the `second-instance` event.
   *
   * Emitted inside the primary instance when a second instance is executed and calls `requestSingleInstanceLock`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'second-instance', listener: (event: ElectronEvent, argv: string[], workingDirectory: string, additionalData: unknown, ackCallback: unknown) => void): this;

  /**
   * Registers a listener for the `select-client-certificate` event.
   *
   * Emitted when a client certificate is requested.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'select-client-certificate', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, certificateList: ElectronCertificate[], callback: (certificate?: ElectronCertificate) => void) => void): this;

  /**
   * Registers a listener for the `session-created` event.
   *
   * Emitted when Electron has created a new `session`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'session-created', listener: (session: Session) => void): this;

  /**
   * Registers a listener for the `update-activity-state` event.
   *
   * Emitted when Handoff is about to be resumed on another device. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'update-activity-state', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Registers a listener for the `web-contents-created` event.
   *
   * Emitted when a new `webContents` is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'web-contents-created', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Registers a listener for the `will-continue-activity` event.
   *
   * Emitted during Handoff before an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'will-continue-activity', listener: (event: ElectronEvent, type: string) => void): this;

  /**
   * Registers a listener for the `will-finish-launching` event.
   *
   * Emitted when the application has finished basic startup.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'will-finish-launching', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a listener for the `will-quit` event.
   *
   * Emitted when all windows have been closed and the application will quit.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'will-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `window-all-closed` event.
   *
   * Emitted when all windows have been closed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  on(event: 'window-all-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `accessibility-support-changed` event.
   *
   * Emitted when Chrome's accessibility support changes. macOS and Windows only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'accessibility-support-changed', listener: (event: ElectronEvent, accessibilitySupportEnabled: boolean) => void): this;

  /**
   * Registers a one-time listener for the `activate` event.
   *
   * Emitted when the application is activated. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'activate', listener: (event: ElectronEvent, hasVisibleWindows: boolean) => void): this;

  /**
   * Registers a one-time listener for the `activity-was-continued` event.
   *
   * Emitted during Handoff after an activity from this device was successfully resumed on another one. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'activity-was-continued', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Registers a one-time listener for the `before-quit` event.
   *
   * Emitted before the application starts closing its windows.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'before-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `browser-window-blur` event.
   *
   * Emitted when a browserWindow gets blurred.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'browser-window-blur', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Registers a one-time listener for the `browser-window-created` event.
   *
   * Emitted when a new browserWindow is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'browser-window-created', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Registers a one-time listener for the `browser-window-focus` event.
   *
   * Emitted when a browserWindow gets focused.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'browser-window-focus', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Registers a one-time listener for the `certificate-error` event.
   *
   * Emitted when failed to verify the certificate for a URL.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'certificate-error', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Registers a one-time listener for the `child-process-gone` event.
   *
   * Emitted when the child process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'child-process-gone', listener: (event: ElectronEvent, details: ElectronDetails) => void): this;

  /**
   * Registers a one-time listener for the `continue-activity` event.
   *
   * Emitted during Handoff when an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'continue-activity', listener: (event: ElectronEvent, type: string, userInfo: unknown, details: ElectronContinueActivityDetails) => void): this;

  /**
   * Registers a one-time listener for the `continue-activity-error` event.
   *
   * Emitted during Handoff when an activity from a different device fails to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'continue-activity-error', listener: (event: ElectronEvent, type: string, error: string) => void): this;

  /**
   * Registers a one-time listener for the `did-become-active` event.
   *
   * Emitted every time the app becomes active. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'did-become-active', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `first-instance-ack` event.
   *
   * Emitted in the second instance during `requestSingleInstanceLock` when the first instance calls the `ackCallback`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'first-instance-ack', listener: (event: ElectronEvent, additionalData: unknown) => void): this;

  /**
   * Registers a one-time listener for the `gpu-info-update` event.
   *
   * Emitted whenever there is a GPU info update.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'gpu-info-update', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `gpu-process-crashed` event.
   *
   * Emitted when the GPU process crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  once(event: 'gpu-process-crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Registers a one-time listener for the `login` event.
   *
   * Emitted when `webContents` wants to do basic auth.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'login', listener: (event: ElectronEvent, webContents: ElectronWebContents, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Registers a one-time listener for the `new-window-for-tab` event.
   *
   * Emitted when the user clicks the native macOS new tab button. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'new-window-for-tab', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `open-file` event.
   *
   * Emitted when the user wants to open a file with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'open-file', listener: (event: ElectronEvent, path: string) => void): this;

  /**
   * Registers a one-time listener for the `open-url` event.
   *
   * Emitted when the user wants to open a URL with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'open-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Registers a one-time listener for the `quit` event.
   *
   * Emitted when the application is quitting.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'quit', listener: (event: ElectronEvent, exitCode: number) => void): this;

  /**
   * Registers a one-time listener for the `ready` event.
   *
   * Emitted once, when Electron has finished initializing.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'ready', listener: (event: ElectronEvent, launchInfo: ElectronNotificationResponse | Record<string, unknown>) => void): this;

  /**
   * Registers a one-time listener for the `render-process-gone` event.
   *
   * Emitted when the renderer process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'render-process-gone', listener: (event: ElectronEvent, webContents: ElectronWebContents, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Registers a one-time listener for the `renderer-process-crashed` event.
   *
   * Emitted when the renderer process of `webContents` crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  once(event: 'renderer-process-crashed', listener: (event: ElectronEvent, webContents: ElectronWebContents, killed: boolean) => void): this;

  /**
   * Registers a one-time listener for the `second-instance` event.
   *
   * Emitted inside the primary instance when a second instance is executed and calls `requestSingleInstanceLock`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'second-instance', listener: (event: ElectronEvent, argv: string[], workingDirectory: string, additionalData: unknown, ackCallback: unknown) => void): this;

  /**
   * Registers a one-time listener for the `select-client-certificate` event.
   *
   * Emitted when a client certificate is requested.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'select-client-certificate', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, certificateList: ElectronCertificate[], callback: (certificate?: ElectronCertificate) => void) => void): this;

  /**
   * Registers a one-time listener for the `session-created` event.
   *
   * Emitted when Electron has created a new `session`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'session-created', listener: (session: Session) => void): this;

  /**
   * Registers a one-time listener for the `update-activity-state` event.
   *
   * Emitted when Handoff is about to be resumed on another device. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'update-activity-state', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Registers a one-time listener for the `web-contents-created` event.
   *
   * Emitted when a new `webContents` is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'web-contents-created', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Registers a one-time listener for the `will-continue-activity` event.
   *
   * Emitted during Handoff before an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'will-continue-activity', listener: (event: ElectronEvent, type: string) => void): this;

  /**
   * Registers a one-time listener for the `will-finish-launching` event.
   *
   * Emitted when the application has finished basic startup.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'will-finish-launching', listener: (...args: unknown[]) => void): this;

  /**
   * Registers a one-time listener for the `will-quit` event.
   *
   * Emitted when all windows have been closed and the application will quit.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'will-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `window-all-closed` event.
   *
   * Emitted when all windows have been closed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  once(event: 'window-all-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Tries to close all windows. The `before-quit` event is emitted first; if all windows are
   * successfully closed, the `will-quit` event is emitted and by default the application terminates.
   */
  quit(): void;

  /**
   * Relaunches the app when the current instance exits.
   *
   * @param options - Options controlling the relaunched instance.
   */
  relaunch(options?: ElectronRelaunchOptions): void;

  /** Releases all locks that were created by `requestSingleInstanceLock`. */
  releaseSingleInstanceLock(): void;

  /**
   * Removes the current executable as the default handler for a protocol. macOS and Windows only.
   *
   * @param protocol - The protocol name, without the `://`.
   * @param path - The executable path to compare against.
   * @param args - The arguments to compare against.
   * @returns Whether the call succeeded.
   */
  removeAsDefaultProtocolClient(protocol: string, path?: string, args?: string[]): boolean;

  /**
   * Removes a previously added listener for the `accessibility-support-changed` event.
   *
   * Emitted when Chrome's accessibility support changes. macOS and Windows only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'accessibility-support-changed', listener: (event: ElectronEvent, accessibilitySupportEnabled: boolean) => void): this;

  /**
   * Removes a previously added listener for the `activate` event.
   *
   * Emitted when the application is activated. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'activate', listener: (event: ElectronEvent, hasVisibleWindows: boolean) => void): this;

  /**
   * Removes a previously added listener for the `activity-was-continued` event.
   *
   * Emitted during Handoff after an activity from this device was successfully resumed on another one. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'activity-was-continued', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Removes a previously added listener for the `before-quit` event.
   *
   * Emitted before the application starts closing its windows.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'before-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes a previously added listener for the `browser-window-blur` event.
   *
   * Emitted when a browserWindow gets blurred.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'browser-window-blur', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Removes a previously added listener for the `browser-window-created` event.
   *
   * Emitted when a new browserWindow is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'browser-window-created', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Removes a previously added listener for the `browser-window-focus` event.
   *
   * Emitted when a browserWindow gets focused.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'browser-window-focus', listener: (event: ElectronEvent, window: ElectronBrowserWindow) => void): this;

  /**
   * Removes a previously added listener for the `certificate-error` event.
   *
   * Emitted when failed to verify the certificate for a URL.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'certificate-error', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, error: string, certificate: ElectronCertificate, callback: (isTrusted: boolean) => void, isMainFrame: boolean) => void): this;

  /**
   * Removes a previously added listener for the `child-process-gone` event.
   *
   * Emitted when the child process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'child-process-gone', listener: (event: ElectronEvent, details: ElectronDetails) => void): this;

  /**
   * Removes a previously added listener for the `continue-activity` event.
   *
   * Emitted during Handoff when an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'continue-activity', listener: (event: ElectronEvent, type: string, userInfo: unknown, details: ElectronContinueActivityDetails) => void): this;

  /**
   * Removes a previously added listener for the `continue-activity-error` event.
   *
   * Emitted during Handoff when an activity from a different device fails to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'continue-activity-error', listener: (event: ElectronEvent, type: string, error: string) => void): this;

  /**
   * Removes a previously added listener for the `did-become-active` event.
   *
   * Emitted every time the app becomes active. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'did-become-active', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes a previously added listener for the `first-instance-ack` event.
   *
   * Emitted in the second instance during `requestSingleInstanceLock` when the first instance calls the `ackCallback`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'first-instance-ack', listener: (event: ElectronEvent, additionalData: unknown) => void): this;

  /**
   * Removes a previously added listener for the `gpu-info-update` event.
   *
   * Emitted whenever there is a GPU info update.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'gpu-info-update', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously added listener for the `gpu-process-crashed` event.
   *
   * Emitted when the GPU process crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  removeListener(event: 'gpu-process-crashed', listener: (event: ElectronEvent, killed: boolean) => void): this;

  /**
   * Removes a previously added listener for the `login` event.
   *
   * Emitted when `webContents` wants to do basic auth.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'login', listener: (event: ElectronEvent, webContents: ElectronWebContents, authenticationResponseDetails: ElectronAuthenticationResponseDetails, authInfo: ElectronAuthInfo, callback: (username?: string, password?: string) => void) => void): this;

  /**
   * Removes a previously added listener for the `new-window-for-tab` event.
   *
   * Emitted when the user clicks the native macOS new tab button. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'new-window-for-tab', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes a previously added listener for the `open-file` event.
   *
   * Emitted when the user wants to open a file with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'open-file', listener: (event: ElectronEvent, path: string) => void): this;

  /**
   * Removes a previously added listener for the `open-url` event.
   *
   * Emitted when the user wants to open a URL with the application. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'open-url', listener: (event: ElectronEvent, url: string) => void): this;

  /**
   * Removes a previously added listener for the `quit` event.
   *
   * Emitted when the application is quitting.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'quit', listener: (event: ElectronEvent, exitCode: number) => void): this;

  /**
   * Removes a previously added listener for the `ready` event.
   *
   * Emitted once, when Electron has finished initializing.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'ready', listener: (event: ElectronEvent, launchInfo: ElectronNotificationResponse | Record<string, unknown>) => void): this;

  /**
   * Removes a previously added listener for the `render-process-gone` event.
   *
   * Emitted when the renderer process unexpectedly disappears.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'render-process-gone', listener: (event: ElectronEvent, webContents: ElectronWebContents, details: ElectronRenderProcessGoneDetails) => void): this;

  /**
   * Removes a previously added listener for the `renderer-process-crashed` event.
   *
   * Emitted when the renderer process of `webContents` crashes or is killed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   *
   * @deprecated Deprecated by Electron.
   */
  removeListener(event: 'renderer-process-crashed', listener: (event: ElectronEvent, webContents: ElectronWebContents, killed: boolean) => void): this;

  /**
   * Removes a previously added listener for the `second-instance` event.
   *
   * Emitted inside the primary instance when a second instance is executed and calls `requestSingleInstanceLock`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'second-instance', listener: (event: ElectronEvent, argv: string[], workingDirectory: string, additionalData: unknown, ackCallback: unknown) => void): this;

  /**
   * Removes a previously added listener for the `select-client-certificate` event.
   *
   * Emitted when a client certificate is requested.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'select-client-certificate', listener: (event: ElectronEvent, webContents: ElectronWebContents, url: string, certificateList: ElectronCertificate[], callback: (certificate?: ElectronCertificate) => void) => void): this;

  /**
   * Removes a previously added listener for the `session-created` event.
   *
   * Emitted when Electron has created a new `session`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'session-created', listener: (session: Session) => void): this;

  /**
   * Removes a previously added listener for the `update-activity-state` event.
   *
   * Emitted when Handoff is about to be resumed on another device. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'update-activity-state', listener: (event: ElectronEvent, type: string, userInfo: unknown) => void): this;

  /**
   * Removes a previously added listener for the `web-contents-created` event.
   *
   * Emitted when a new `webContents` is created.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'web-contents-created', listener: (event: ElectronEvent, webContents: ElectronWebContents) => void): this;

  /**
   * Removes a previously added listener for the `will-continue-activity` event.
   *
   * Emitted during Handoff before an activity from a different device wants to be resumed. macOS only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'will-continue-activity', listener: (event: ElectronEvent, type: string) => void): this;

  /**
   * Removes a previously added listener for the `will-finish-launching` event.
   *
   * Emitted when the application has finished basic startup.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'will-finish-launching', listener: (...args: unknown[]) => void): this;

  /**
   * Removes a previously added listener for the `will-quit` event.
   *
   * Emitted when all windows have been closed and the application will quit.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'will-quit', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes a previously added listener for the `window-all-closed` event.
   *
   * Emitted when all windows have been closed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronApp` instance.
   */
  removeListener(event: 'window-all-closed', listener: (...args: unknown[]) => void): this;

  /**
   * Requests the single instance lock. Returns whether this instance obtained the lock and should
   * continue loading.
   *
   * @param additionalData - A JSON object to send to the first instance.
   * @returns Whether this process is the primary instance.
   */
  requestSingleInstanceLock(additionalData?: Record<string, unknown>): boolean;

  /** Marks the current Handoff user activity as inactive without invalidating it. macOS only. */
  resignCurrentActivity(): void;

  /**
   * Sets the about panel options.
   *
   * @param options - The about panel options.
   */
  setAboutPanelOptions(options: ElectronAboutPanelOptionsOptions): void;

  /**
   * Manually enables or disables Chrome's accessibility support. Must be called after the `ready`
   * event. macOS and Windows only.
   *
   * @param enabled - Whether to enable accessibility support.
   */
  setAccessibilitySupportEnabled(enabled: boolean): void;

  /**
   * Sets the activation policy for the app. macOS only.
   *
   * @param policy - The activation policy.
   */
  setActivationPolicy(policy: 'accessory' | 'prohibited' | 'regular'): void;

  /**
   * Sets or creates a directory for the app's logs.
   *
   * @param path - The custom log directory path.
   */
  setAppLogsPath(path?: string): void;

  /**
   * Changes the Application User Model ID to `id`. Windows only.
   *
   * @param id - The Application User Model ID.
   */
  setAppUserModelId(id: string): void;

  /**
   * Sets the current executable as the default handler for a protocol.
   *
   * @param protocol - The protocol name, without the `://`.
   * @param path - The executable path.
   * @param args - The arguments.
   * @returns Whether the call succeeded.
   */
  setAsDefaultProtocolClient(protocol: string, path?: string, args?: string[]): boolean;

  /**
   * Sets the counter badge for the current app. Setting the count to `0` hides the badge. Linux and macOS only.
   *
   * @param count - The badge count.
   * @returns Whether the call succeeded.
   */
  setBadgeCount(count?: number): boolean;

  /**
   * Sets or removes a custom Jump List for the application. Windows only.
   *
   * @param categories - The Jump List categories, or `null` to restore the standard Jump List.
   */
  setJumpList(categories: ElectronJumpListCategory[] | null): void;

  /**
   * Sets the app's login item settings. macOS and Windows only.
   *
   * @param settings - The login item settings.
   */
  setLoginItemSettings(settings: ElectronSettings): void;

  /**
   * Overrides the current application's name.
   *
   * @param name - The new application name.
   */
  setName(name: string): void;

  /**
   * Overrides the path to a special directory or file associated with `name`.
   *
   * @param name - The name of the special path to override.
   * @param path - The new path.
   */
  setPath(name: string, path: string): void;

  /**
   * Sets whether Secure Keyboard Entry is enabled in the application. macOS only.
   *
   * @param enabled - Whether to enable Secure Keyboard Entry.
   */
  setSecureKeyboardEntryEnabled(enabled: boolean): void;

  /**
   * Creates an `NSUserActivity` and sets it as the current activity. macOS only.
   *
   * @param type - Uniquely identifies the activity.
   * @param userInfo - App-specific state to store for use by another device.
   * @param webpageURL - The webpage to load in a browser if no suitable app is installed on the resuming device.
   */
  setUserActivity(type: string, userInfo: unknown, webpageURL?: string): void;

  /**
   * Adds `tasks` to the Tasks category of the Jump List. Windows only.
   *
   * @param tasks - The tasks to add.
   * @returns Whether the call succeeded.
   */
  setUserTasks(tasks: ElectronTask[]): boolean;

  /** Shows application windows after they were hidden. Does not automatically focus them. macOS only. */
  show(): void;

  /** Shows the app's about panel options. */
  showAboutPanel(): void;

  /** Shows the platform's native emoji picker. macOS and Windows only. */
  showEmojiPanel(): void;

  /**
   * Starts accessing a security scoped resource. Must be balanced by calling the returned function
   * once finished. macOS (MAS) only.
   *
   * @param bookmarkData - The base64-encoded security scoped bookmark data.
   * @returns A function that stops accessing the security scoped resource.
   */
  startAccessingSecurityScopedResource(bookmarkData: string): () => void;

  /**
   * Updates the current activity if its type matches `type`, merging the entries from `userInfo`. macOS only.
   *
   * @param type - Uniquely identifies the activity.
   * @param userInfo - App-specific state to merge into the current activity.
   */
  updateCurrentActivity(type: string, userInfo: unknown): void;

  /**
   * Returns a promise fulfilled when Electron is initialized.
   *
   * @returns A promise resolved when the app is ready.
   */
  whenReady(): Promise<void>;
}
