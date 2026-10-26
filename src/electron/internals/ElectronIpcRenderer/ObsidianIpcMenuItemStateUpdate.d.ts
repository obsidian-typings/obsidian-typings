import type { ElectronMenuItem } from '../ElectronMenuItem.d.ts';

/**
 * A change to one application menu item, as Obsidian's `update-menu-items` IPC channel takes it.
 *
 * @public
 * @unofficial
 */
export interface ObsidianIpcMenuItemStateUpdate {
  /** The properties to assign to the menu item. */
  eState: Partial<ElectronMenuItem>;

  /** The `id` of the menu item to change; an unknown id is ignored. */
  itemId: string;
}
