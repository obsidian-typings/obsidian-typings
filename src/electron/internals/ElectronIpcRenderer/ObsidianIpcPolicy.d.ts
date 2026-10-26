/**
 * The organization policy Obsidian's main process returns on the `policy` IPC channel.
 *
 * Read from the `policy.json` file of an `obsidian-work` install; every other install gets every feature allowed.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcPolicy {
  /** Whether the developer tools may be opened; passed to every vault window's `webPreferences.devTools`. */
  devTools: boolean;

  /** Whether early access versions may be installed. */
  insider: boolean;

  /** `true` to allow every community plugin, `false` to allow none, or the ids of the allowed ones. */
  plugins: boolean | string[];

  /** Whether Obsidian Publish may be used. */
  publish: boolean;

  /** Whether CSS snippets may be used. */
  snippets: boolean;

  /** Whether Obsidian Sync may be used. */
  sync: boolean;

  /** `true` to allow every community theme, `false` to allow none, or the names of the allowed ones. */
  themes: boolean | string[];

  /** Whether the Web viewer core plugin may be used. */
  webViewer: boolean;
}
