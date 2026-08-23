/**
 * Electron NativeTheme for reading and updating the system's theme preferences.
 *
 * @public
 * @unofficial
 */
export interface ElectronNativeTheme {
  /**
   * A `boolean` indicating whether Chromium is in forced colors mode, controlled by system accessibility settings.
   * Currently, Windows high contrast is the only system setting that triggers forced colors mode.
   *
   * Platform: `win32`.
   */
  readonly inForcedColorsMode: boolean;

  /**
   * A `boolean` for if the OS / Chromium currently has a dark mode enabled or is being instructed to show a
   * dark-style UI. If you want to modify this value you should use `themeSource` below.
   */
  readonly shouldUseDarkColors: boolean;

  /**
   * A `boolean` for if the OS / Chromium currently has high-contrast mode enabled or is being instructed to show a
   * high-contrast UI.
   *
   * Platform: `darwin,win32`.
   */
  readonly shouldUseHighContrastColors: boolean;

  /**
   * A `boolean` for if the OS / Chromium currently has an inverted color scheme or is being instructed to use an
   * inverted color scheme.
   *
   * Platform: `darwin,win32`.
   */
  readonly shouldUseInvertedColorScheme: boolean;

  /**
   * A `string` property that can be `system`, `light` or `dark`. It is used to override and supersede the value that
   * Chromium has chosen to use internally. Setting this property to `system` will remove the override and everything
   * will be reset to the OS default.
   */
  themeSource: 'dark' | 'light' | 'system';

  /**
   * Adds a listener for the `updated` event.
   *
   * Emitted when something in the underlying `NativeTheme` has changed. This normally means that either the value of
   * `shouldUseDarkColors`, `shouldUseHighContrastColors` or `shouldUseInvertedColorScheme` has changed. You will have
   * to check them to determine which one has changed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronNativeTheme` instance.
   */
  addListener(event: 'updated', listener: () => void): this;

  /**
   * Registers a listener for the `updated` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronNativeTheme` instance.
   */
  on(event: 'updated', listener: () => void): this;

  /**
   * Registers a one-time listener for the `updated` event. The listener is removed after it is invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronNativeTheme` instance.
   */
  once(event: 'updated', listener: () => void): this;

  /**
   * Removes every listener for the `updated` event, or every listener of any event when no event is given.
   *
   * @param event - The event name.
   * @returns This `ElectronNativeTheme` instance.
   */
  removeAllListeners(event?: 'updated'): this;

  /**
   * Removes the specified listener for the `updated` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronNativeTheme` instance.
   */
  removeListener(event: 'updated', listener: () => void): this;
}
