/**
 * @public
 * @unofficial
 *
 * Due to limitations of TypeScript, we cannot extend the `Platform` constant directly.
 * @example
 *
 * ```ts
 * import { Platform } from 'obsidian';
 * import type { PlatformEx } from 'obsidian-typings';
 * const platformEx = Platform as PlatformEx;
 * console.log(platformEx.canDisplayRibbon);
 * ```
 */
export interface PlatformEx {
    /** Whether the platform supports displaying the sidebar ribbon. */
    canDisplayRibbon: boolean;

    /** Whether the platform supports exporting to PDF. */
    canExportPdf: boolean;

    /** Whether the platform supports popping out windows. */
    canPopoutWindow: boolean;

    /** Whether the platform supports splitting panes. */
    canSplit: boolean;

    /** Whether the platform supports stacking tabs. */
    canStackTabs: boolean;

    /**
     * We're running the `Android` app.
     *
     * @official
     */
    isAndroidApp: boolean;

    /**
     * The UI is in desktop mode.
     *
     * @official
     */
    isDesktop: boolean;

    /**
     * We're running the `Electron`-based desktop app.
     *
     * @official
     */
    isDesktopApp: boolean;

    /**
     * We're running the `iOS` app.
     *
     * @official
     */
    isIosApp: boolean;

    /**
     * We're on a Linux device.
     *
     * @official
     */
    isLinux: boolean;

    /**
     * We're on a macOS device, or a device that pretends to be one (like iPhones and iPads).
     * Typically used to detect whether to use command-based hotkeys vs ctrl-based hotkeys.
     *
     * @official
     */
    isMacOS: boolean;

    /**
     * The UI is in mobile mode.
     *
     * @official
     */
    isMobile: boolean;

    /**
     * We're running the `Capacitor` mobile app.
     *
     * @official
     */
    isMobileApp: boolean;

    /**
     * We're in a mobile app that has very limited screen space.
     *
     * @official
     */
    isPhone: boolean;

    /**
     * We're running in Safari.
     * Typically used to provide workarounds for Safari bugs.
     *
     * @official
     */
    isSafari: boolean;

    /**
     * We're in a mobile app that has sufficiently large screen space.
     * @official
     */
    isTablet: boolean;

    /**
     * We're on a Windows device.
     *
     * @official
     */
    isWin: boolean;

    /** Height of the mobile device screen in pixels. */
    mobileDeviceHeight: number;

    /** Height of the software keyboard in pixels on mobile. */
    mobileKeyboardHeight: number;

    /** Whether the software keyboard is currently visible on mobile. */
    mobileSoftKeyboardVisible: boolean;

    /**
     * The path prefix for resolving local files on this platform.
     * This returns:
     * - `file:///` on mobile.
     * - `app://random-id/` on desktop (Replaces the old format of `app://local/`).
     *
     * @official
     */
    resourcePathPrefix: string;
}
