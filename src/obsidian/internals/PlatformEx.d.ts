/**
 * Due to limitations of TypeScript, we cannot extend the {@link obsidian#Platform} constant directly.
 *
 * @example
 *
 * ```ts
 * import { Platform } from 'obsidian';
 * import type { PlatformEx } from 'obsidian-typings';
 * const platformEx = Platform as PlatformEx;
 * console.log(platformEx.canDisplayRibbon);
 * ```
 *
 * @public
 * @unofficial
 */
export interface PlatformEx {
  /**
   * The version of the installer that shipped this app.
   * It advances independently of {@link PlatformEx.version} and determines which `Electron` version the app runs on.
   */
  build: string;

  /**
   * Whether the platform supports displaying the sidebar ribbon.
   */
  canDisplayRibbon: boolean;

  /**
   * Whether the platform supports exporting to PDF.
   */
  canExportPdf: boolean;

  /**
   * Whether the platform supports pinning the sidebar.
   */
  canPinSidebar: boolean;

  /**
   * Whether the platform supports popping out windows.
   */
  canPopoutWindow: boolean;

  /**
   * Whether the platform supports splitting panes.
   */
  canSplit: boolean;

  /**
   * Whether the platform supports stacking tabs.
   */
  canStackTabs: boolean;

  /**
   * The name of the device. On desktop this is the host name of the machine.
   */
  deviceName: string;

  /**
   * Whether a hardware keyboard is attached. Always `true` in the desktop app.
   */
  hasPhysicalKeyboard: boolean;

  /**
   * We're running the `Android` app.
   */
  isAndroidApp: boolean;

  /**
   * The UI is in desktop mode.
   */
  isDesktop: boolean;

  /**
   * We're running the `Electron`-based desktop app.
   */
  isDesktopApp: boolean;

  /**
   * We're running the `iOS` app.
   */
  isIosApp: boolean;

  /**
   * We're on a Linux device.
   */
  isLinux: boolean;

  /**
   * We're on a macOS device, or a device that pretends to be one (like iPhones and iPads).
   * Typically used to detect whether to use command-based hotkeys vs ctrl-based hotkeys.
   */
  isMacOS: boolean;

  /**
   * The UI is in mobile mode.
   */
  isMobile: boolean;

  /**
   * We're running the `Capacitor` mobile app.
   */
  isMobileApp: boolean;

  /**
   * We're in a mobile app that has very limited screen space.
   */
  isPhone: boolean;

  /**
   * We're running in Safari.
   * Typically used to provide workarounds for Safari bugs.
   */
  isSafari: boolean;

  /**
   * We're in a mobile app that has sufficiently large screen space.
   */
  isTablet: boolean;

  /**
   * We're on a Windows device.
   */
  isWin: boolean;

  /**
   * The manufacturer of the device. Empty on desktop.
   */
  manufacturer: string;

  /**
   * Height of the mobile device screen in pixels.
   */
  mobileDeviceHeight: number;

  /**
   * Height of the software keyboard in pixels on mobile.
   */
  mobileKeyboardHeight: number;

  /**
   * Whether the software keyboard is currently visible on mobile.
   */
  mobileSoftKeyboardVisible: boolean;

  /**
   * The model of the device. Empty on desktop.
   */
  model: string;

  /**
   * The name of the operating system. On desktop this is the descriptive version string, such as `Windows 11 Pro`.
   */
  osName: string;

  /**
   * The version of the operating system. On desktop this is the kernel release, such as `10.0.26200`.
   */
  osVersion: string;

  /**
   * The path prefix for resolving local files on this platform.
   * This returns:
   * - `file:///` on mobile.
   * - `app://random-id/` on desktop (Replaces the old format of `app://local/`).
   */
  resourcePathPrefix: string;

  /**
   * Whether `IndexedDB` is available on this platform. Features that need it are disabled when it is not.
   */
  supportsIndexedDb: boolean;

  /**
   * The version of the Obsidian app.
   */
  version: string;
}
