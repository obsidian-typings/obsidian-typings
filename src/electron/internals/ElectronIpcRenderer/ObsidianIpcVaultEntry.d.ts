/**
 * One vault in the registry Obsidian's main process keeps in `obsidian.json` and returns on the `vault-list` IPC channel.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcVaultEntry {
  /** `true` while the vault has a window open; absent otherwise. */
  open?: true;

  /** The absolute path of the vault folder. */
  path: string;

  /** When the vault was last opened, in milliseconds since the Unix epoch. */
  ts: number;
}
