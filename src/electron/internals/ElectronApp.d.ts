/**
 * Electron App for controlling the application lifecycle.
 *
 * @public
 * @unofficial
 */
export interface ElectronApp {
  /**
   * Exits the application immediately.
   *
   * @param exitCode - The exit code.
   */
  exit(exitCode?: number): void;

  /**
   * Returns the current application locale.
   *
   * @returns The locale string.
   */
  getLocale(): string;

  /**
   * Returns the application name.
   *
   * @returns The application name.
   */
  getName(): string;

  /**
   * Returns a platform-specific path for the given name.
   *
   * @param name - The path name to retrieve.
   * @returns The full path.
   */
  getPath(name: string): string;

  /**
   * Returns the application version.
   *
   * @returns The version string.
   */
  getVersion(): string;

  /**
   * Returns whether the app is ready.
   *
   * @returns Whether the app is ready.
   */
  isReady(): boolean;

  /**
   * Registers an event listener on the app.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This ElectronApp instance.
   */
  on(event: string, listener: (...args: unknown[]) => void): this;

  /** Quits the application. */
  quit(): void;
}
