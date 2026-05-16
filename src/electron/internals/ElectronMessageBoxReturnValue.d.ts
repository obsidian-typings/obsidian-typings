/**
 * Return value from an Electron message box dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronMessageBoxReturnValue {
  /** Whether the checkbox was checked. */
  checkboxChecked: boolean;

  /** The index of the clicked button. */
  response: number;
}
