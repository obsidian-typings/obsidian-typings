/**
 * Reads and manipulates the command line arguments that Chromium uses.
 *
 * @public
 * @unofficial
 */
export interface ElectronCommandLine {
  /**
   * Appends an argument to Chromium's command line. The argument is quoted correctly.
   *
   * @param value - The argument to append.
   */
  appendArgument(value: string): void;

  /**
   * Appends a switch (with optional value) to Chromium's command line.
   *
   * @param theSwitch - The switch to append.
   * @param value - The optional value for the switch.
   */
  appendSwitch(theSwitch: string, value?: string): void;

  /**
   * Returns the value of the given command-line switch.
   *
   * @param theSwitch - The switch to read.
   * @returns The switch value, or an empty string when the switch is absent or has no value.
   */
  getSwitchValue(theSwitch: string): string;

  /**
   * Returns whether the given command-line switch is present.
   *
   * @param theSwitch - The switch to check.
   * @returns Whether the command-line switch is present.
   */
  hasSwitch(theSwitch: string): boolean;

  /**
   * Removes the specified switch from Chromium's command line.
   *
   * @param theSwitch - The switch to remove.
   */
  removeSwitch(theSwitch: string): void;
}
