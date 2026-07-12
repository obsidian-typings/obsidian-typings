import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Performs actions on the app icon in the user's dock on macOS.
 *
 * @public
 * @unofficial
 */
export interface ElectronDock {
  /**
   * Bounces the dock icon. When `critical` is passed, the icon bounces until the app becomes active
   * or the request is canceled; when `informational` is passed, it bounces for one second. macOS only.
   *
   * @param type - The bounce type.
   * @returns An ID representing the request.
   */
  bounce(type?: 'critical' | 'informational'): number;

  /**
   * Cancels the bounce of the given request. macOS only.
   *
   * @param id - The bounce request ID.
   */
  cancelBounce(id: number): void;

  /**
   * Bounces the Downloads stack if the file path is inside the Downloads folder. macOS only.
   *
   * @param filePath - The path of the finished download.
   */
  downloadFinished(filePath: string): void;

  /**
   * Returns the badge string of the dock. macOS only.
   *
   * @returns The badge string.
   */
  getBadge(): string;

  /**
   * Returns the application's dock menu. macOS only.
   *
   * @returns The dock menu, or `null` if none has been set.
   */
  getMenu(): ElectronMenu | null;

  /** Hides the dock icon. macOS only. */
  hide(): void;

  /**
   * Returns whether the dock icon is visible. macOS only.
   *
   * @returns Whether the dock icon is visible.
   */
  isVisible(): boolean;

  /**
   * Sets the string to be displayed in the dock's badging area. macOS only.
   *
   * @param text - The badge text.
   */
  setBadge(text: string): void;

  /**
   * Sets the image associated with this dock icon. macOS only.
   *
   * @param image - The image, or a path to it.
   */
  setIcon(image: ElectronNativeImage | string): void;

  /**
   * Sets the application's dock menu. macOS only.
   *
   * @param menu - The menu to set.
   */
  setMenu(menu: ElectronMenu): void;

  /**
   * Shows the dock icon. macOS only.
   *
   * @returns A promise resolved when the dock icon is shown.
   */
  show(): Promise<void>;
}
