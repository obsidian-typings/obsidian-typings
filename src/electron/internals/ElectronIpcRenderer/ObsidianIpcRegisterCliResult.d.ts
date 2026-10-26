/**
 * The outcome of adding Obsidian's command line tool to the `PATH`, as the `register-cli` IPC channel returns it.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcRegisterCliResult {
  /** A message describing the outcome, to show to the user. */
  message: string;

  /** Whether the tool is on the `PATH` now. */
  success: boolean;
}
