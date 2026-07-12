import type { ElectronApp } from './ElectronApp.d.ts';
import type { ElectronAutoUpdater } from './ElectronAutoUpdater.d.ts';
import type { ElectronBrowserView } from './ElectronBrowserView.d.ts';
import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronClipboard } from './ElectronClipboard.d.ts';
import type { ElectronContentTracing } from './ElectronContentTracing.d.ts';
import type { ElectronCrashReporter } from './ElectronCrashReporter.d.ts';
import type { ElectronDesktopCapturer } from './ElectronDesktopCapturer.d.ts';
import type { ElectronDialog } from './ElectronDialog.d.ts';
import type { ElectronGlobalShortcut } from './ElectronGlobalShortcut.d.ts';
import type { ElectronInAppPurchase } from './ElectronInAppPurchase.d.ts';
import type { ElectronIpcMain } from './ElectronIpcMain.d.ts';
import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronMenuItem } from './ElectronMenuItem.d.ts';
import type { ElectronMessageChannelMain } from './ElectronMessageChannelMain.d.ts';
import type { ElectronNativeImageModule } from './ElectronNativeImageModule.d.ts';
import type { ElectronNativeTheme } from './ElectronNativeTheme.d.ts';
import type { ElectronNet } from './ElectronNet.d.ts';
import type { ElectronNetLog } from './ElectronNetLog.d.ts';
import type { ElectronNotification } from './ElectronNotification.d.ts';
import type { ElectronPowerMonitor } from './ElectronPowerMonitor.d.ts';
import type { ElectronPowerSaveBlocker } from './ElectronPowerSaveBlocker.d.ts';
import type { ElectronProtocol } from './ElectronProtocol.d.ts';
import type { ElectronSafeStorage } from './ElectronSafeStorage.d.ts';
import type { ElectronScreen } from './ElectronScreen.d.ts';
import type { ElectronSessionModule } from './ElectronSessionModule.d.ts';
import type { ElectronShareMenu } from './ElectronShareMenu.d.ts';
import type { ElectronShell } from './ElectronShell.d.ts';
import type { ElectronSystemPreferences } from './ElectronSystemPreferences.d.ts';
import type { ElectronTouchBar } from './ElectronTouchBar.d.ts';
import type { ElectronTray } from './ElectronTray.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebContentsModule } from './ElectronWebContentsModule.d.ts';
import type { ElectronWebFrameMainModule } from './ElectronWebFrameMainModule.d.ts';

/**
 * Electron `@electron/remote` module for accessing main process modules from the renderer.
 *
 * @public
 * @unofficial
 */
export interface ElectronRemote {
  /** The main process app instance. */
  app: ElectronApp;

  /** The main process `autoUpdater` module. */
  autoUpdater: ElectronAutoUpdater;

  /** The `BrowserView` constructor. */
  BrowserView: typeof ElectronBrowserView;

  /** The `BrowserWindow` constructor. */
  BrowserWindow: typeof ElectronBrowserWindow;

  /** The main process `clipboard` module. */
  clipboard: ElectronClipboard;

  /** The main process `contentTracing` module. */
  contentTracing: ElectronContentTracing;

  /** The main process `crashReporter` module. */
  crashReporter: ElectronCrashReporter;

  /** The main process `desktopCapturer` module. */
  desktopCapturer: ElectronDesktopCapturer;

  /** The main process `dialog` module. */
  dialog: ElectronDialog;

  /** The main process `globalShortcut` module. */
  globalShortcut: ElectronGlobalShortcut;

  /** The main process `inAppPurchase` module. macOS only. */
  inAppPurchase: ElectronInAppPurchase;

  /** The main process `ipcMain` module. */
  ipcMain: ElectronIpcMain;

  /** The `Menu` constructor. */
  Menu: typeof ElectronMenu;

  /** The `MenuItem` constructor. */
  MenuItem: typeof ElectronMenuItem;

  /** The `MessageChannelMain` constructor. */
  MessageChannelMain: typeof ElectronMessageChannelMain;

  /** The main process `nativeImage` module. */
  nativeImage: ElectronNativeImageModule;

  /** The main process `nativeTheme` module. */
  nativeTheme: ElectronNativeTheme;

  /** The main process `net` module. */
  net: ElectronNet;

  /** The main process `netLog` module. */
  netLog: ElectronNetLog;

  /** The `Notification` constructor. */
  Notification: typeof ElectronNotification;

  /** The main process `powerMonitor` module. */
  powerMonitor: ElectronPowerMonitor;

  /** The main process `powerSaveBlocker` module. */
  powerSaveBlocker: ElectronPowerSaveBlocker;

  /** The main process `process` object. */
  process: NodeJS.Process;

  /** The main process `protocol` module. */
  protocol: ElectronProtocol;

  /** The main process `safeStorage` module. */
  safeStorage: ElectronSafeStorage;

  /** The main process `screen` module. */
  screen: ElectronScreen;

  /** The main process `session` module. */
  session: ElectronSessionModule;

  /** The `ShareMenu` constructor. macOS only. */
  ShareMenu: typeof ElectronShareMenu;

  /** The main process `shell` module. */
  shell: ElectronShell;

  /** The main process `systemPreferences` module. */
  systemPreferences: ElectronSystemPreferences;

  /** The `TouchBar` constructor. macOS only. */
  TouchBar: typeof ElectronTouchBar;

  /** The `Tray` constructor. */
  Tray: typeof ElectronTray;

  /** The main process `webContents` module. */
  webContents: ElectronWebContentsModule;

  /** The main process `webFrameMain` module. */
  webFrameMain: ElectronWebFrameMainModule;

  /**
   * Wraps a value in a function that returns it, for passing across the remote boundary.
   *
   * @param returnValue - The value the created function should return.
   * @returns A function returning `returnValue`.
   */
  createFunctionWithReturnValue<T>(returnValue: T): () => T;

  /**
   * Returns the main process module built into Electron with the given name.
   *
   * @param name - The built-in module name.
   * @returns The requested built-in module.
   */
  getBuiltin(name: string): unknown;

  /**
   * Returns the web contents of the current renderer process.
   *
   * @returns The current web contents.
   */
  getCurrentWebContents(): ElectronWebContents;

  /**
   * Returns the BrowserWindow of the current renderer process.
   *
   * @returns The current BrowserWindow.
   */
  getCurrentWindow(): ElectronBrowserWindow;

  /**
   * Returns the global variable of the given name from the main process.
   *
   * @param name - The global variable name.
   * @returns The requested global value.
   */
  getGlobal(name: string): unknown;

  /**
   * Returns the module required from the main process by the given path.
   *
   * @param module - The module path to require.
   * @returns The required module.
   */
  require(module: string): unknown;
}
