import type { ElectronMenuItemConstructorOptions } from '../ElectronMenuItemConstructorOptions.d.ts';

/**
 * One item of the application menu template Obsidian's `set-menu` IPC channel takes.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcMenuItemTemplate extends ElectronMenuItemConstructorOptions {
  /**
   * The id of an Obsidian command. The main process makes it the item's `id` and runs the command in the focused
   * vault window when the item is clicked.
   */
  appCommand?: string;

  /** The items of the submenu. */
  submenu?: ObsidianIpcMenuItemTemplate[];
}
