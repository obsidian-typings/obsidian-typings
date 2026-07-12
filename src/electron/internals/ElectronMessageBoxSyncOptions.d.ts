import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * Options for Electron synchronous message box dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronMessageBoxSyncOptions {
  /** The array of button labels. On Windows, an empty array will result in one button labeled `OK`. */
  buttons?: string[];

  /** The index of the button to be used to cancel the dialog. */
  cancelId?: number;

  /** The index of the button that is selected by default. */
  defaultId?: number;

  /** Extra information about the message. */
  detail?: string;

  /** The icon to display in the message box. */
  icon?: ElectronNativeImage | string;

  /** The content of the message box. */
  message: string;

  /** Whether to set the no link flag for the message box on Windows. */
  noLink?: boolean;

  /**
   * Whether to normalize keyboard access keys across platforms.
   *
   * @default `false`
   */
  normalizeAccessKeys?: boolean;

  /** Custom width of the text in the message box (macOS only). */
  textWidth?: number;

  /** The title of the message box. */
  title?: string;

  /** The type of the message box. */
  type?: 'error' | 'info' | 'none' | 'question' | 'warning';
}
