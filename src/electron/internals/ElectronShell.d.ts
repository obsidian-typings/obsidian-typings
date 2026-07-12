import type { ElectronShellOpenExternalOptions } from './ElectronShellOpenExternalOptions.d.ts';
import type { ElectronShortcutDetails } from './ElectronShortcutDetails.d.ts';

/**
 * Electron Shell for managing files and URLs using their default applications.
 *
 * @public
 * @unofficial
 */
export interface ElectronShell {
  /** Plays the system beep sound. */
  beep(): void;

  /**
   * Opens the given external protocol URL in the desktop's default manner (for example, `mailto:` URLs in the user's default mail agent).
   *
   * @param url - The URL to open.
   * @param options - Options for opening the URL.
   * @returns A `Promise` that resolves when the URL has been opened.
   */
  openExternal(url: string, options?: ElectronShellOpenExternalOptions): Promise<void>;

  /**
   * Opens the given file in the desktop's default manner.
   *
   * @param path - The path to open.
   * @returns A `Promise` that resolves with an error message if a failure occurred, otherwise an empty string.
   */
  openPath(path: string): Promise<string>;

  /**
   * Resolves the shortcut link at `shortcutPath`. An exception is thrown when any error happens. Only available on Windows (`win32`).
   *
   * @param shortcutPath - The path to the shortcut link.
   * @returns The details of the shortcut link.
   */
  readShortcutLink(shortcutPath: string): ElectronShortcutDetails;

  /**
   * Shows the given file in a file manager. If possible, selects the file.
   *
   * @param fullPath - The full path to the file.
   */
  showItemInFolder(fullPath: string): void;

  /**
   * Moves a path to the OS-specific trash location (Trash on macOS, Recycle Bin on Windows, and a desktop-environment-specific location on Linux).
   *
   * @param path - The path to the file.
   * @returns A `Promise` that resolves when the operation has completed and rejects if there was an error while deleting the requested item.
   */
  trashItem(path: string): Promise<void>;

  /**
   * Creates or updates a shortcut link at `shortcutPath`. Only available on Windows (`win32`).
   *
   * @param shortcutPath - The path to the shortcut link.
   * @param operation - The operation to perform on the shortcut link.
   * @param options - The details of the shortcut link.
   * @returns Whether the shortcut was created successfully.
   */
  writeShortcutLink(shortcutPath: string, operation: 'create' | 'replace' | 'update', options: ElectronShortcutDetails): boolean;

  /**
   * Creates or updates a shortcut link at `shortcutPath`. Only available on Windows (`win32`).
   *
   * @param shortcutPath - The path to the shortcut link.
   * @param options - The details of the shortcut link.
   * @returns Whether the shortcut was created successfully.
   */
  writeShortcutLink(shortcutPath: string, options: ElectronShortcutDetails): boolean;
}
