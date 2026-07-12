import type { ElectronAnimationSettings } from './ElectronAnimationSettings.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronUserDefaultTypes } from './ElectronUserDefaultTypes.d.ts';

/**
 * Electron SystemPreferences for reading and writing system-wide preferences.
 *
 * @public
 * @unofficial
 */
export interface ElectronSystemPreferences {
  /**
   * A `string` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your
   * application. This maps to values in `NSApplication.appearance`. Setting this will override the system default as
   * well as the value of `getEffectiveAppearance`.
   *
   * Platform: `darwin`.
   */
  appLevelAppearance: 'dark' | 'light' | 'unknown';

  /**
   * A `string` property that can be `dark`, `light` or `unknown`. Returns the macOS appearance setting that is
   * currently applied to your application, maps to `NSApplication.effectiveAppearance`.
   *
   * Platform: `darwin`.
   */
  readonly effectiveAppearance: 'dark' | 'light' | 'unknown';

  /**
   * Adds a listener for the `accent-color-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   */
  addListener(event: 'accent-color-changed', listener: (event: ElectronEvent, newColor: string) => void): this;

  /**
   * Adds a listener for the `color-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   */
  addListener(event: 'color-changed', listener: (event: ElectronEvent) => void): this;

  /**
   * Adds a listener for the `high-contrast-color-scheme-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  addListener(event: 'high-contrast-color-scheme-changed', listener: (event: ElectronEvent, highContrastColorScheme: boolean) => void): this;

  /**
   * Adds a listener for the `inverted-color-scheme-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  addListener(event: 'inverted-color-scheme-changed', listener: (event: ElectronEvent, invertedColorScheme: boolean) => void): this;

  /**
   * Prompts the user for access to the given media type. Resolves with `true` if consent was granted and `false` if
   * it was denied.
   *
   * @param mediaType - The media type to request access to.
   * @returns A promise resolving to whether access was granted.
   *
   * Platform: `darwin`.
   */
  askForMediaAccess(mediaType: 'camera' | 'microphone'): Promise<boolean>;

  /**
   * Returns whether or not this device has the ability to use Touch ID.
   *
   * @returns Whether this device can prompt for Touch ID.
   *
   * Platform: `darwin`.
   */
  canPromptTouchID(): boolean;

  /**
   * Returns the user's current system wide accent color preference in RGBA hexadecimal form.
   *
   * @returns The accent color in RGBA hexadecimal form.
   *
   * Platform: `win32,darwin`.
   */
  getAccentColor(): string;

  /**
   * Returns an object with the system animation settings.
   *
   * @returns The system animation settings.
   */
  getAnimationSettings(): ElectronAnimationSettings;

  /**
   * Gets the macOS appearance setting that you have declared you want for your application, maps to
   * `NSApplication.appearance`. Can be `dark`, `light` or `unknown`.
   *
   * @returns The declared app-level appearance.
   *
   * @deprecated
   * Platform: `darwin`.
   */
  getAppLevelAppearance(): 'dark' | 'light' | 'unknown';

  /**
   * Returns the system color setting in RGB hexadecimal form (`#ABCDEF`).
   *
   * @param color - The named system color to look up.
   * @returns The system color in RGB hexadecimal form.
   *
   * Platform: `win32,darwin`.
   */
  getColor(
    color:
      | '3d-dark-shadow'
      | '3d-face'
      | '3d-highlight'
      | '3d-light'
      | '3d-shadow'
      | 'active-border'
      | 'active-caption-gradient'
      | 'active-caption'
      | 'alternate-selected-control-text'
      | 'app-workspace'
      | 'button-text'
      | 'caption-text'
      | 'control-background'
      | 'control-text'
      | 'control'
      | 'desktop'
      | 'disabled-control-text'
      | 'disabled-text'
      | 'find-highlight'
      | 'grid'
      | 'header-text'
      | 'highlight-text'
      | 'highlight'
      | 'hotlight'
      | 'inactive-border'
      | 'inactive-caption-gradient'
      | 'inactive-caption-text'
      | 'inactive-caption'
      | 'info-background'
      | 'info-text'
      | 'keyboard-focus-indicator'
      | 'label'
      | 'link'
      | 'menu-highlight'
      | 'menu-text'
      | 'menu'
      | 'menubar'
      | 'placeholder-text'
      | 'quaternary-label'
      | 'scrollbar'
      | 'scrubber-textured-background'
      | 'secondary-label'
      | 'selected-content-background'
      | 'selected-control-text'
      | 'selected-control'
      | 'selected-menu-item-text'
      | 'selected-text-background'
      | 'selected-text'
      | 'separator'
      | 'shadow'
      | 'tertiary-label'
      | 'text-background'
      | 'text'
      | 'under-page-background'
      | 'unemphasized-selected-content-background'
      | 'unemphasized-selected-text-background'
      | 'unemphasized-selected-text'
      | 'window-background'
      | 'window-frame-text'
      | 'window-frame'
      | 'window-text'
      | 'window'
  ): string;

  /**
   * Gets the macOS appearance setting that is currently applied to your application, maps to
   * `NSApplication.effectiveAppearance`. Can be `dark`, `light` or `unknown`.
   *
   * @returns The effective appearance.
   *
   * Platform: `darwin`.
   */
  getEffectiveAppearance(): 'dark' | 'light' | 'unknown';

  /**
   * Returns the access status for the given media type. Can be `not-determined`, `granted`, `denied`, `restricted`
   * or `unknown`.
   *
   * @param mediaType - The media type to query.
   * @returns The access status for the given media type.
   *
   * Platform: `win32,darwin`.
   */
  getMediaAccessStatus(mediaType: 'camera' | 'microphone' | 'screen'): 'denied' | 'granted' | 'not-determined' | 'restricted' | 'unknown';

  /**
   * Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility
   * settings. The standard system color is formatted as `#RRGGBBAA`.
   *
   * @param color - The named standard system color to look up.
   * @returns The standard system color formatted as `#RRGGBBAA`.
   *
   * Platform: `darwin`.
   */
  getSystemColor(color: 'blue' | 'brown' | 'gray' | 'green' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow'): string;

  /**
   * Returns the value of `key` in `NSUserDefaults`.
   *
   * @param key - The `NSUserDefaults` key to read.
   * @param type - The type of the value stored under `key`.
   * @returns The value of `key` in `NSUserDefaults`.
   *
   * Platform: `darwin`.
   */
  getUserDefault<Type extends keyof ElectronUserDefaultTypes>(key: string, type: Type): ElectronUserDefaultTypes[Type];

  /**
   * Returns `true` if DWM composition (Aero Glass) is enabled, and `false` otherwise.
   *
   * @returns Whether DWM composition is enabled.
   *
   * Platform: `win32`.
   */
  isAeroGlassEnabled(): boolean;

  /**
   * Returns whether the system is in Dark Mode.
   *
   * @returns Whether the system is in Dark Mode.
   *
   * @deprecated
   * Platform: `darwin,win32`.
   */
  isDarkMode(): boolean;

  /**
   * Returns `true` if a high contrast theme is active, `false` otherwise.
   *
   * @returns Whether a high contrast theme is active.
   *
   * @deprecated
   * Platform: `darwin,win32`.
   */
  isHighContrastColorScheme(): boolean;

  /**
   * Returns `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds)
   * is active, `false` otherwise.
   *
   * @returns Whether an inverted color scheme is active.
   *
   * @deprecated
   * Platform: `win32`.
   */
  isInvertedColorScheme(): boolean;

  /**
   * Returns whether the Swipe between pages setting is on.
   *
   * @returns Whether the Swipe between pages setting is on.
   *
   * Platform: `darwin`.
   */
  isSwipeTrackingFromScrollEventsEnabled(): boolean;

  /**
   * Returns `true` if the current process is a trusted accessibility client and `false` if it is not.
   *
   * @param prompt - Whether to prompt the user with a system dialog if the process is not trusted.
   * @returns Whether the current process is a trusted accessibility client.
   *
   * Platform: `darwin`.
   */
  isTrustedAccessibilityClient(prompt: boolean): boolean;

  /**
   * Registers a listener for the `accent-color-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   */
  on(event: 'accent-color-changed', listener: (event: ElectronEvent, newColor: string) => void): this;

  /**
   * Registers a listener for the `color-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   */
  on(event: 'color-changed', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a listener for the `high-contrast-color-scheme-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  on(event: 'high-contrast-color-scheme-changed', listener: (event: ElectronEvent, highContrastColorScheme: boolean) => void): this;

  /**
   * Registers a listener for the `inverted-color-scheme-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  on(event: 'inverted-color-scheme-changed', listener: (event: ElectronEvent, invertedColorScheme: boolean) => void): this;

  /**
   * Registers a one-time listener for the `accent-color-changed` event. The listener is removed after it is invoked
   * once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   */
  once(event: 'accent-color-changed', listener: (event: ElectronEvent, newColor: string) => void): this;

  /**
   * Registers a one-time listener for the `color-changed` event. The listener is removed after it is invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   */
  once(event: 'color-changed', listener: (event: ElectronEvent) => void): this;

  /**
   * Registers a one-time listener for the `high-contrast-color-scheme-changed` event. The listener is removed after
   * it is invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  once(event: 'high-contrast-color-scheme-changed', listener: (event: ElectronEvent, highContrastColorScheme: boolean) => void): this;

  /**
   * Registers a one-time listener for the `inverted-color-scheme-changed` event. The listener is removed after it is
   * invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  once(event: 'inverted-color-scheme-changed', listener: (event: ElectronEvent, invertedColorScheme: boolean) => void): this;

  /**
   * Posts `event` as native notifications of macOS. The `userInfo` is an object that contains the user information
   * dictionary sent along with the notification.
   *
   * @param event - The notification event name.
   * @param userInfo - The user information dictionary sent along with the notification.
   *
   * Platform: `darwin`.
   */
  postLocalNotification(event: string, userInfo: Record<string, unknown>): void;

  /**
   * Posts `event` as native notifications of macOS. The `userInfo` is an object that contains the user information
   * dictionary sent along with the notification.
   *
   * @param event - The notification event name.
   * @param userInfo - The user information dictionary sent along with the notification.
   * @param deliverImmediately - Whether to deliver the notification immediately.
   *
   * Platform: `darwin`.
   */
  postNotification(event: string, userInfo: Record<string, unknown>, deliverImmediately?: boolean): void;

  /**
   * Posts `event` as native notifications of macOS. The `userInfo` is an object that contains the user information
   * dictionary sent along with the notification.
   *
   * @param event - The notification event name.
   * @param userInfo - The user information dictionary sent along with the notification.
   *
   * Platform: `darwin`.
   */
  postWorkspaceNotification(event: string, userInfo: Record<string, unknown>): void;

  /**
   * Prompts the user to authenticate with Touch ID. Resolves if the user has successfully authenticated with
   * Touch ID.
   *
   * @param reason - The reason presented to the user for the authentication request.
   * @returns A promise that resolves once the user has authenticated.
   *
   * Platform: `darwin`.
   */
  promptTouchID(reason: string): Promise<void>;

  /**
   * Adds the specified defaults to your application's `NSUserDefaults`.
   *
   * @param defaults - The defaults to add.
   *
   * Platform: `darwin`.
   */
  registerDefaults(defaults: Record<string, boolean | number | string>): void;

  /**
   * Removes the specified listener for the `accent-color-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronSystemPreferences` instance.
   */
  removeListener(event: 'accent-color-changed', listener: (event: ElectronEvent, newColor: string) => void): this;

  /**
   * Removes the specified listener for the `color-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronSystemPreferences` instance.
   */
  removeListener(event: 'color-changed', listener: (event: ElectronEvent) => void): this;

  /**
   * Removes the specified listener for the `high-contrast-color-scheme-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  removeListener(event: 'high-contrast-color-scheme-changed', listener: (event: ElectronEvent, highContrastColorScheme: boolean) => void): this;

  /**
   * Removes the specified listener for the `inverted-color-scheme-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronSystemPreferences` instance.
   *
   * @deprecated
   * Platform: `win32`.
   */
  removeListener(event: 'inverted-color-scheme-changed', listener: (event: ElectronEvent, invertedColorScheme: boolean) => void): this;

  /**
   * Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key`
   * previously set with `setUserDefault`.
   *
   * @param key - The `NSUserDefaults` key to remove.
   *
   * Platform: `darwin`.
   */
  removeUserDefault(key: string): void;

  /**
   * Sets the appearance setting for your application, this should override the system default and override the value
   * of `getEffectiveAppearance`.
   *
   * @param appearance - The appearance to set, or `null` to reset.
   *
   * @deprecated
   * Platform: `darwin`.
   */
  setAppLevelAppearance(appearance: 'dark' | 'light' | null): void;

  /**
   * Sets the value of `key` in `NSUserDefaults`. Note that `type` should match the actual type of `value`. An
   * exception is thrown if they don't.
   *
   * @param key - The `NSUserDefaults` key to write.
   * @param type - The type of the value being stored.
   * @param value - The value to store.
   *
   * Platform: `darwin`.
   */
  setUserDefault<Type extends keyof ElectronUserDefaultTypes>(key: string, type: Type, value: ElectronUserDefaultTypes[Type]): void;

  /**
   * Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. If `event` is `null`, the
   * `NSNotificationCenter` doesn't use it as criteria for delivery to the observer.
   *
   * @param event - The notification event name, or `null`.
   * @param callback - Called when the corresponding event happens.
   * @returns The ID of this subscription.
   *
   * Platform: `darwin`.
   */
  subscribeLocalNotification(event: null | string, callback: (event: string, userInfo: Record<string, unknown>, object: string) => void): number;

  /**
   * Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the
   * corresponding `event` happens. If `event` is `null`, the `NSDistributedNotificationCenter` doesn't use it as
   * criteria for delivery to the observer.
   *
   * @param event - The notification event name, or `null`.
   * @param callback - Called when the corresponding event happens.
   * @returns The ID of this subscription.
   *
   * Platform: `darwin`.
   */
  subscribeNotification(event: null | string, callback: (event: string, userInfo: Record<string, unknown>, object: string) => void): number;

  /**
   * Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. If `event` is
   * `null`, the `NSWorkspaceNotificationCenter` doesn't use it as criteria for delivery to the observer.
   *
   * @param event - The notification event name, or `null`.
   * @param callback - Called when the corresponding event happens.
   * @returns The ID of this subscription.
   *
   * Platform: `darwin`.
   */
  subscribeWorkspaceNotification(event: null | string, callback: (event: string, userInfo: Record<string, unknown>, object: string) => void): number;

  /**
   * Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.
   *
   * @param id - The ID of the subscription to remove.
   *
   * Platform: `darwin`.
   */
  unsubscribeLocalNotification(id: number): void;

  /**
   * Removes the subscriber with `id`.
   *
   * @param id - The ID of the subscription to remove.
   *
   * Platform: `darwin`.
   */
  unsubscribeNotification(id: number): void;

  /**
   * Same as `unsubscribeNotification`, but removes the subscriber from
   * `NSWorkspace.sharedWorkspace.notificationCenter`.
   *
   * @param id - The ID of the subscription to remove.
   *
   * Platform: `darwin`.
   */
  unsubscribeWorkspaceNotification(id: number): void;
}
