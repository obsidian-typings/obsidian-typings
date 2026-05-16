/**
 * Options for Electron message box dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronMessageBoxOptions {
  /** The array of button labels. */
  buttons?: string[];

  /** The index of the button to be used to cancel the dialog. */
  cancelId?: number;

  /** The initial checked state of the checkbox. */
  checkboxChecked?: boolean;

  /** The label for the checkbox. */
  checkboxLabel?: string;

  /** The index of the button that is selected by default. */
  defaultId?: number;

  /** Extra information about the message. */
  detail?: string;

  /** The content of the message box. */
  message: string;

  /** Whether to set the no link flag for the message box on Windows. */
  noLink?: boolean;

  /** Whether to normalize keyboard access keys across platforms. */
  normalizeAccessKeys?: boolean;

  /** The title of the message box. */
  title?: string;

  /** The type of the message box. */
  type?: 'error' | 'info' | 'none' | 'question' | 'warning';
}
