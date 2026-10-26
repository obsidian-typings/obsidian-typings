/**
 * The vault of the calling window, as Obsidian's main process returns it on the `vault` IPC channel.
 *
 * Both members are absent when the window belongs to no vault, such as the vault picker.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcCurrentVault {
  /** The vault's id, the key of its entry in the `vault-list` registry. */
  id?: string;

  /** The absolute path of the vault folder. */
  path?: string;
}
